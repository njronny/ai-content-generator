/**
 * AI Content Generator API
 * RapidAPI 上架产品
 * 
 * 功能：生成标题、摘要、文章
 * 定价：$0.005/次
 */

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 内容生成模板
const templates = {
  title: {
    blog: [
      "10 {topic} Tips That Will Change Your Life",
      "The Ultimate Guide to {topic}",
      "How to Master {topic} in 30 Days",
      "{topic}: Everything You Need to Know",
      "Why {topic} is the Future",
      "5 Secrets About {topic} Nobody Tells You",
      "{topic} for Beginners: A Complete Guide",
      "The Truth About {topic}",
      "How {topic} Can Transform Your Business",
      "{topic}: The Good, The Bad, and The Ugly"
    ],
    product: [
      "Introducing {topic}: The Revolutionary Solution",
      "{topic}: Finally, A Better Way",
      "Meet {topic}: Your New Best Friend",
      "{topic}: Simple. Powerful. Effective.",
      "Why Choose {topic}?"
    ],
    email: [
      "Quick question about {topic}",
      "Re: {topic} opportunity",
      "{topic} update",
      "Thought you'd like this: {topic}",
      "5-minute {topic} tip"
    ]
  },
  
  summary: {
    blog: "This article explores {topic}, covering key aspects including benefits, challenges, and practical tips. You'll learn how to get started with {topic} and avoid common mistakes.",
    product: "{topic} is a powerful solution designed to help users achieve their goals faster and more efficiently. Key features include ease of use, reliability, and excellent support.",
    email: "Summary: We're discussing {topic} and how it can benefit your workflow. The main points include implementation steps and expected outcomes."
  },

  article: {
    blog: `# {title}

## Introduction

In today's fast-paced world, {topic} has become increasingly important. Whether you're a beginner or an experienced professional, understanding {topic} can significantly impact your success.

## What is {topic}?

{topic} refers to the practice and strategies involved in optimizing your approach to achieve better results. It encompasses various techniques, tools, and methodologies that can help you work smarter, not harder.

## Why {topic} Matters

There are several compelling reasons to focus on {topic}:

1. **Increased Efficiency**: By mastering {topic}, you can accomplish more in less time.
2. **Better Results**: Proper implementation leads to improved outcomes.
3. **Competitive Advantage**: Stay ahead of others in your field.
4. **Cost Savings**: Avoid costly mistakes and optimize resources.

## How to Get Started with {topic}

### Step 1: Research
Begin by understanding the fundamentals of {topic}. Read relevant articles, watch tutorials, and join communities.

### Step 2: Plan
Create a clear strategy for implementing {topic} in your context.

### Step 3: Execute
Start small, measure results, and iterate based on feedback.

### Step 4: Optimize
Continuously improve your approach based on data and experience.

## Common Mistakes to Avoid

- Rushing into {topic} without proper planning
- Ignoring feedback and data
- Overcomplicating the process
- Not staying updated with latest trends

## Conclusion

{topic} is a powerful approach that can transform your results when implemented correctly. Start today, stay consistent, and you'll see remarkable improvements.

---

*Want to learn more? Subscribe to our newsletter for weekly tips on {topic}.*`,

    product: `# {title}

## Overview

{topic} is designed to solve your biggest challenges with innovative solutions and user-friendly design.

## Key Features

- ✅ **Easy to Use**: Intuitive interface that anyone can master
- ✅ **Powerful**: Advanced features for professionals
- ✅ **Reliable**: 99.9% uptime guarantee
- ✅ **Support**: 24/7 customer service
- ✅ **Affordable**: Pricing plans for every budget

## How It Works

1. Sign up for a free account
2. Configure your preferences
3. Start using {topic} immediately
4. See results within days

## Pricing

- **Free**: Basic features, limited usage
- **Pro**: $9.99/month - Full features
- **Enterprise**: Custom pricing for teams

## Testimonials

> "{topic} changed how I work. Highly recommended!" - Sarah J.

> "The best investment I've made this year." - Mike T.

## Get Started Today

Ready to transform your workflow? Start your free trial now.

[Get Started Free →]`,

    email: `Subject: {title}

Hi [Name],

I hope this email finds you well. I wanted to reach out about {topic}.

Here's what you need to know:

• Key point 1
• Key point 2  
• Key point 3

Would you be interested in learning more? I'd love to schedule a quick call to discuss how {topic} can benefit you.

Best regards,
[Your Name]

P.S. Let me know if you have any questions!`
  }
};

/**
 * 生成标题
 * POST /generate/title
 */
app.post('/generate/title', (req, res) => {
  try {
    const { topic, type = 'blog', count = 5 } = req.body;
    
    if (!topic) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: topic'
      });
    }
    
    const titles = templates.title[type] || templates.title.blog;
    const selectedTitles = titles
      .slice(0, count)
      .map(t => t.replace(/{topic}/g, topic));
    
    res.json({
      success: true,
      topic,
      type,
      titles: selectedTitles,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * 生成摘要
 * POST /generate/summary
 */
app.post('/generate/summary', (req, res) => {
  try {
    const { topic, type = 'blog' } = req.body;
    
    if (!topic) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: topic'
      });
    }
    
    const summary = templates.summary[type] || templates.summary.blog;
    const generatedSummary = summary.replace(/{topic}/g, topic);
    
    res.json({
      success: true,
      topic,
      type,
      summary: generatedSummary,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * 生成文章
 * POST /generate/article
 */
app.post('/generate/article', (req, res) => {
  try {
    const { title, topic, type = 'blog' } = req.body;
    
    if (!topic) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: topic'
      });
    }
    
    const article = templates.article[type] || templates.article.blog;
    const generatedArticle = article
      .replace(/{title}/g, title || `The Ultimate Guide to ${topic}`)
      .replace(/{topic}/g, topic);
    
    res.json({
      success: true,
      title: title || `The Ultimate Guide to ${topic}`,
      topic,
      type,
      article: generatedArticle,
      wordCount: generatedArticle.split(/\s+/).length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * 批量生成
 * POST /generate/batch
 */
app.post('/generate/batch', (req, res) => {
  try {
    const { topic, type = 'blog', titleCount = 5 } = req.body;
    
    if (!topic) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: topic'
      });
    }
    
    // 生成标题
    const titles = templates.title[type] || templates.title.blog;
    const selectedTitles = titles
      .slice(0, titleCount)
      .map(t => t.replace(/{topic}/g, topic));
    
    // 生成摘要
    const summary = templates.summary[type] || templates.summary.blog;
    const generatedSummary = summary.replace(/{topic}/g, topic);
    
    // 生成完整文章
    const article = templates.article[type] || templates.article.blog;
    const generatedArticle = article
      .replace(/{title}/g, selectedTitles[0])
      .replace(/{topic}/g, topic);
    
    res.json({
      success: true,
      topic,
      type,
      titles: selectedTitles,
      summary: generatedSummary,
      article: generatedArticle,
      wordCount: generatedArticle.split(/\s+/).length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * 获取支持的内容类型
 * GET /types
 */
app.get('/types', (req, res) => {
  res.json({
    success: true,
    types: [
      { name: 'blog', description: 'Blog posts and articles' },
      { name: 'product', description: 'Product descriptions and landing pages' },
      { name: 'email', description: 'Email templates' }
    ],
    timestamp: new Date().toISOString()
  });
});

/**
 * 健康检查
 * GET /health
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AI Content Generator API',
    version: '1.0.0',
    uptime: process.uptime()
  });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 AI Content Generator API running on port ${PORT}`);
  console.log(`📖 Documentation: http://localhost:${PORT}/health`);
});

module.exports = app;
