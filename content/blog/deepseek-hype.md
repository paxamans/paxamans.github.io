+++
title = "deepseek-hype"
description = "explaining deepseek hype"
date = 2025-01-31
taxonomies.tags = [
    "NLP",
    "open-source"
]
taxonomies.categories = [
    "ML",
    "news"
]
+++

At first glance, it seems like they just utilized all best practices.

My friend recently told me that i have an ability to rapidly find "real life bugs" in everything i try independently without any bias.

![deepseek](https://bear-images.sfo2.cdn.digitaloceanspaces.com/paxamans/deepseek-1.png)

It is funny how "americanized" and "tiktok-like" it became after i prompted it to write using very basic language.

What is that hard line break after *"for"*? And the dollar sign, because of which it formatted the next token sequence in one word via latex. And it is *0-shot*

## Base model
Anyways, here's how architecture looks like:

![fig2](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fea1c5554-749c-4e8f-990a-6e110011907f_861x755.png)

According to information we have([if it's true](https://hackaday.com/2025/01/27/new-open-source-deepseek-v3-language-model-making-waves)). They used H800, which is export-restricted version of H100, and they state it required 2.788M GPU-Hours on that for full training, in dollars it's \$5.576M at a H800 rental price of \$2 per hour. comparing with [Meta's](https://x.com/_LouiePeters/status/1816443587053092917?lang=en) \$60M.

Of course it raised some concerns between Zuck's employees:

![metapanic](https://bear-images.sfo2.cdn.digitaloceanspaces.com/paxamans/metapanic.jpg)

## Reasoning

So there are 2 models, *DeepSeek-R1-Zero* and *DeepSeek-R1*, built on *DeepSeek-V3-Base*.

R1 zero was trained with [GRPO](https://arxiv.org/pdf/2402.03300), a variant of [PPO](https://en.wikipedia.org/wiki/Proximal_policy_optimization).

It has potential to perform exceptionally well at reasoning tasks without labeled [SFT](https://huggingface.co/docs/trl/main/en/sft_trainer) set. Makes sense, base model was trained on 14.8 trillion tokens and it is evaluated on reasoning tasks, not on general chatting.

DeepSeek developed two key models: Zero and R1. While Zero performs well overall, it has some limitations:
- Tends to get stuck in repetitive patterns
- Sometimes mixes different languages
- Can produce text that's difficult to read

DeepSeek-R1 introduced improvements through a multi-stage training process:

1. Cold Start Phase
- Initial training on thousands of Chain-of-Thought (CoT) examples
- Creates a better foundation before reinforcement learning

2. Reasoning-focused RL
- Uses the same reasoning-oriented reinforcement learning as in Zero

3. Supervised Fine-Tuning (SFT)
- 600k reasoning-focused examples
- 200k general (non-reasoning) examples

4. Final Phase
- Additional round of reinforcement learning

*"OpenAI, has complained that rivals, including those in China, are using its work to make rapid advances in developing their own artificial intelligence (AI) tools."*
[source](https://www.bbc.co.uk/news/articles/c9vm1m8wpr9o.amp)

In conclusion, their idea was to parse whole internet, and now they cry about "bad chinese" being reasonably better. I think DeepSeek made a really good leap in reasoning, but overall thing around it, is pretty overhyped.

links:
[DeepSeek-V3](https://github.com/deepseek-ai/DeepSeek-V3/blob/main/DeepSeek_V3.pdf) 
[DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1/blob/main/DeepSeek_R1.pdf)

links for other inventions:

multimodal model. text+image input output [Janus 1B & 7B](https://github.com/deepseek-ai/Janus/blob/main/janus_pro_tech_report.pdf)

llava-style VLM with MoE. text+image input; out: text [DeepSeek-VL2](https://github.com/deepseek-ai/DeepSeek-VL2/blob/main/DeepSeek_VL2_paper.pdf)
