# 🚀 Open in External Browser

**Open in External Browser** is a simple, lightweight JavaScript utility that detects when your webpage is opened inside an **in-app browser** (such as Instagram, Facebook, Messenger, or Twitter) and automatically redirects users to their **system browser** (Safari, Chrome, etc.) for a smoother and more secure experience.

---

## 🌟 Features

- ✅ Detects popular in-app browsers (Instagram, Facebook, Messenger, Twitter)  
- ✅ Works on **iOS** and **Android**  
- ✅ Uses 'intent:' (Android) and 'x-safari-https:' (iOS) schemes  
- ✅ Prevents redirect loops with 'sessionStorage'  
- ✅ Fallback restore if redirect fails  

---

## 📦 Installation

You can include it via a script tag or import it into your project.

```html
<script src="open-in-external.js"></script>
```

---

## ⚙️ Supported In-App Browsers

| App | Detected | Tested |
|-----|-----------|---------|
| Instagram | ✅ | ✅ |
| Facebook | ✅ | ✅ |
| Messenger | ✅ | ✅ |
| Twitter / X | ✅ | ❌ |
| Others | Ignored | — |

---

## 🧪 Example Flow

1. User opens your link from Instagram bio → it loads in Instagram’s in-app browser.  
2. The script detects “Instagram” in the user agent.  
3. It automatically redirects to the system browser (Safari or Chrome).  
4. If redirect fails, a fallback restores the original page after about one second.
   
---

## 🔒 Safety & Policy Notes

This tool is for **educational and UX improvement purposes only**.  
Please review and comply with the **terms of service** of each platform before automatically opening external browsers.

---

## 🪪 License

This project is licensed under the **MIT License** — free for personal and commercial use.  
See [LICENSE](LICENSE) for details.

---
