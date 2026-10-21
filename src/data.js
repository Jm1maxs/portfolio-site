export const HERO_VIDEO =
  'https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4'

export const profile = {
  name: '计铭一',
  role: '游戏设计师 · 系统策划',
  location: '中国',
  email: '3267732998@qq.com',
  education: '中国矿业大学（211） · 环境设计 · 2025.09—2029.06',
  intro:
    '我是一名游戏设计师 / 系统策划，擅长把模糊的玩法想法拆成清晰的系统框架、功能流程与可落地配置。关注叙事与战斗的融合、数值平衡与商业化闭环，也持续用 AI Agent 加速原型验证和团队协作。',
  bio: [
    '主修环境设计原理、空间设计与数字化媒体表达，具备调研分析、设计报告撰写和方案汇报能力，习惯用“问题—结构—验证”的方式推进游戏设计。',
    '累计游戏时长突破 6000 小时，长期保持对玩法、品类与行业趋势的敏感度，并能把体验判断转译成系统策划语言。'
  ],
  stats: [
    { value: '6000h+', label: '累计游戏时长' },
    { value: '4+', label: '系统策划 / 独立项目' },
    { value: 'AI', label: 'Agent 辅助开发工作流' }
  ],
  tags: [
    '系统框架',
    '数值配置',
    '功能拆解',
    'Unity / Godot',
    'Codex / Claude Code',
    'Axure / XMind'
  ]
}

export const navLinks = [
  { href: '#projects', label: '精选项目', index: '01' },
  { href: '#about', label: '个人经历', index: '02' },
  { href: '#strengths', label: '个人优势', index: '03' },
  { href: '#contact', label: '联系方式', index: '04' }
]

export const projects = [
  {
    id: 'campus-life',
    index: '01',
    title: 'My Campus L.I.F.E.',
    subtitle: 'AI 辅助 2D 像素校园生活叙事游戏',
    role: '独立开发 / 策划',
    date: '2026.04 — 至今',
    theme: 'mint',
    coverCode: 'MCL',
    summary:
      '一款由 AI 辅助制作的 2D 像素风校园生活叙事游戏。探索将大模型融入游戏策划、美术资源与程序开发流程，用 Agent 快速完成玩法与功能验证。',
    points: ['AI Agent 游戏开发流程', 'Gemini Gem 模块化资源生成', 'Godot 玩法原型验证'],
    tags: ['AI Agent', 'Godot', '2D 像素', '叙事'],
    link: {
      label: '观看演示',
      href: 'https://www.bilibili.com/video/BV1UhbV68EYF/?'
    }
  },
  {
    id: 'wuxing-moling',
    index: '02',
    title: '五行墨灵',
    subtitle: '腾讯游戏创作大赛 · 回合捕捉 RPG',
    role: '策划',
    date: '2026.07 — 2026.09',
    theme: 'violet',
    coverCode: 'WXM',
    summary:
      '讲述被天命选中的少年在收集灵宠的过程中拯救世界的故事。独立设计快捷轮盘、角色对话、宠物状态栏等多个系统，并统筹策划、美术与程序的落地对接。',
    points: ['快捷轮盘 / 对话 / 宠物状态系统', '跨职能沟通与方案推动', 'AI 工具分担美术制作'],
    tags: ['系统策划', 'RPG', '腾讯大赛', 'AI 辅助'],
    link: {
      label: '观看演示',
      href: 'https://www.bilibili.com/video/BV1RPeP6REna/'
    }
  },
  {
    id: 'yanyun-shop',
    index: '03',
    title: '燕云十六声 · 商城系统策划案',
    subtitle: '商城结构 / 商品交互 / 付费功能拆解',
    role: '系统策划',
    date: '2026.05',
    theme: 'cyan',
    coverCode: 'YY16',
    summary:
      '独立完成《燕云十六声》商城系统策划案练习，对商城整体结构、外观售卖、商品交互及付费功能进行系统拆解与设计，并输出可落地的完整策划文档与配置表。',
    points: ['商城解锁入口 + 8 大 Tab 框架', '3D 外观预览交互复刻', '商品卡片 / 限时标签 / 详情弹窗'],
    tags: ['商城系统', '交互拆解', '配置表', '商业化'],
    link: {
      label: '查看文档',
      href: 'https://docs.qq.com/doc/DVVpXR0ZvSEpzUVJX'
    }
  },
  {
    id: 'brawl-stars',
    index: '04',
    title: '荒野乱斗 · 角色养成系统拆解案',
    subtitle: '养成循环 / 资源消耗 / 付费转化分析',
    role: '系统策划',
    date: '2026.06',
    theme: 'amber',
    coverCode: 'BS',
    summary:
      '针对《荒野乱斗》角色养成体系进行系统拆解，从养成循环、资源消耗、角色强度及付费转化等角度分析设计，并提出可执行的优化方案。',
    points: ['角色等级与多线养成关系', '分层养成结构与强度曲线', '资源效率与付费转化逻辑'],
    tags: ['系统拆解', '数值分析', '付费转化'],
    link: {
      label: '查看文档',
      href: 'https://docs.qq.com/doc/DVUJqZ05vWU1VZ1B5'
    }
  }
]

export const strengths = [
  {
    index: '01',
    title: '系统策划能力',
    icon: 'sys',
    description:
      '具备系统策划案撰写经验，能完成系统框架梳理、功能拆解、流程设计、数值配置与策划文档输出；了解叙事战斗融合与数值平衡。'
  },
  {
    index: '02',
    title: '引擎验证能力',
    icon: 'engine',
    description:
      '掌握 Unity、Godot 引擎使用能力，了解场景搭建、交互、动画与资源配置，能够把策划方案快速落地为可验证的玩法原型。'
  },
  {
    index: '03',
    title: 'AI 工作流',
    icon: 'ai',
    description:
      '熟练运用 Codex、Claude Code 等 AI Agent 辅助游戏制作，覆盖代码生成与修改、功能原型开发、策划工具制作与开发流程辅助。'
  },
  {
    index: '04',
    title: '设计表达',
    icon: 'tools',
    description:
      '熟练使用 XMind、Axure、Excel、Word 进行系统需求分析与原型设计；用 PS、Blender、SketchUp 完成三维辅助设计。'
  }
]
