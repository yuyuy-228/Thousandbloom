# 花千树 · 考研英语学习台

一盏灯、一张书桌、一条把题目讲透的路。  
花千树是一个面向考研英语一/英语二与大学生四六级的 AI 学习工作台。

## 在线演示

GitHub Pages（纯前端静态演示）：

**https://yuyuy-228.github.io/Thousandbloom/**

> GitHub Pages 只能托管静态页面，不能运行 FastAPI/MySQL。  
> 所以线上的注册、登录、云同步、AI 代理与反馈提交不可用；进入登录门后点「静态演示 · 试用」，
> 或直接访问 `https://yuyuy-228.github.io/Thousandbloom/?trial=1` 体验本地数据版本。  
> 完整系统需要把 `huaqianshu-stack` 后端部署到服务器，见仓库内 `docs/部署与多用户说明.md`。

## 功能

- **考研英语**：倒计时、点灯打卡、词汇间隔重复、真题 PDF 作答、错题复盘、写作 AI 润色、周报。
- **四六级 AI 辅导**：AI 生成题库、在线判分、逐题讲解、AI 问答、个人题库云同步。
- **伴学灯灵「小灯」**：拖拽、对话、灯油、皮肤、挂件、自定义头像。
- **账号系统**：注册/登录、管理员视角、反馈与 FAQ、审计日志。
- **PWA**：可安装到桌面/主屏幕，支持离线打开已缓存页面。
- **关于与版权**：扇面美术作品《东风夜放花千树》作品登记证书，见 `/about.html`。

## 本地预览

纯前端：

```bash
python -m http.server 8080
# 打开 http://127.0.0.1:8080/
```

完整系统（FastAPI + MySQL）：

```bash
cd huaqianshu-stack/backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8010
# 打开 http://127.0.0.1:8010/
```

后端配置在 `backend/.env`，管理员账号、数据库密码、AI 代理鉴权都在那里；不要提交到 Git。

## 目录

- `index.html`：学习台主界面（单文件前端）
- `about.html` / `legal.html`：关于与版权、用户协议与隐私政策
- `404.html`：此路无灯
- `assets/copyright/`：证书与扇面展示图
- `pdf.min.js` / `pdf.worker.min.js`：真题 PDF 渲染
- `manifest.webmanifest` / `sw.js`：PWA

## 版权

扇面美术作品《扇-东风夜放花千树》著作权人余昊洋，作品登记号
`豫作登字-2026-F-00118177`，河南省版权局登记。未经书面许可，不得复制、改编或商用。

《青玉案·元夕》原文属公有领域，页面引用仅作文化出处说明。
