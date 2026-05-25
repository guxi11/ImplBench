
─── tailrec: 12 iterations ───
   #1  53,993→74,191 tok   9 msg  $2.1812
   #2  48,383→61,815 tok   8 msg  $1.5209  −5.1k
   #3  47,947→56,021 tok   4 msg  $0.7684  −8.8k
   #4  48,605→64,581 tok  10 msg  $1.8433  −9.6k
   #5  48,157→50,883 tok   5 msg  $0.8507  −11.7k
   #6  48,139→57,021 tok   3 msg  $0.6269  −12.7k
   #7  48,459→57,789 tok   8 msg  $1.4177  −13.4k
   #8  48,251→65,285 tok   7 msg  $1.3636  −16.6k
   #9  48,077→57,337 tok   3 msg  $0.6339  −19.2k
  #10  48,227→60,807 tok   3 msg  $0.6839  −20.2k
  #11  47,955→49,799 tok   3 msg  $0.5586  −22.3k
  #12  45,229→45,813 tok   2 msg  $0.3849  −22.8k
  $12.8338 actual  │  $16.4483 single-session  │  22% saved

issues:
1. 预测算法不准确，乐观完美缓存，而且只用了output的diff，没有利用全部的context diff，包含了工具调用等
  Total hypothetical ≈ $23.27

  对比旧算法的 $16.45，新算法估算更高因为计入了 user messages + tool results
  的累积（不只是 assistant output）。

  Savings: (1 - 12.83/23.27) ≈ 45%，比旧的 22% 显著提升——这更真实地反映了 tailrec 在多轮
  tool-heavy session 中的价值。

1. cache 利用率低，在中间破坏了

  组件: Backend (claude)
  调用方式: 子进程 spawn("script", ...) + TTY passthrough
  模型: 用户选的 backend
  ────────────────────────────────────────
  组件: Collector
  调用方式: OpenAI SDK 直接调用
  模型: collector_model (DeepSeek等)
  ────────────────────────────────────────
  组件: Bridge
  调用方式: OpenAI SDK 直接调用
  模型: bridge_model (DeepSeek等)

  Collector 和 Bridge 走的是 OpenAI-compatible API，无法利用 Anthropic prefix cache。只有
   Backend（claude）通过 --append-system-prompt 注入的内容走 Anthropic API，能享受 prefix
   cache。

  当前 appendix 组装顺序（prompt-builder.ts）

  Layer 1: TASK_BOUNDARY / MAIN_SESSION_CONSTRAINT   ← 稳定 ✓
  Layer 2: TOOLS_SECTION                             ← 稳定 ✓
  Layer 3: Shared cards (sorted by filename)         ← 稳定 ✓
  Layer 4: Collector-selected task cards             ← ⚠️ 每次变化
  Layer 5: Decisions JSON                            ← 半稳定（递增）
  Layer 6: Current Task (= buildTaskQuery output)    ← ⚠️ 每次变化
  Layer 7: Reminder                                  ← 稳定 ✓

  Cache 断裂点在 Layer 4。一旦 collector 选出不同的 cards，后面全部 miss。

  buildTaskQuery 内部顺序问题

  当前：
  Task title       ← 变
  Task spec        ← 变
  Design (design.md)  ← 稳定！同一个 plan 所有 task 共享
  Handoff (input.md)  ← 变
  Scope Boundary      ← 稳定

  Design 是 plan 级的不变量，放在变化内容之后，完全浪费了 cache 前缀的机会。

