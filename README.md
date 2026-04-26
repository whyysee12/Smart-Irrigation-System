

# 💧 Smart Water Irrigation System

**An intelligent, real-time irrigation dashboard powered by ESP32 & AI**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[🚀 Live Demo](https://ai.studio/apps/d05e7b8b-6c1a-4f57-aabf-edc550f568d8) · [📊 Dashboard](#features) · [⚙️ Setup](#getting-started)

</div>

---

## 📖 Overview

A responsive, real-time frontend dashboard for a Smart Water Irrigation System built around the **ESP32 microcontroller**. It monitors soil moisture, temperature, humidity, rain, and light levels — and automatically controls a DC water pump to maintain optimal soil conditions. Includes manual override, historical analytics, and configurable plant presets.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌱 **Live Sensor Telemetry** | Real-time charts for soil moisture, temperature & humidity |
| 💧 **Auto Pump Control** | Pump activates/deactivates based on moisture thresholds |
| 🌧️ **Rain Detection** | Automatically disables pump when rain is detected |
| ☀️ **Light Monitoring** | LDR-based ambient light level tracking (Lux) |
| 🔋 **Battery Status** | Visual battery level indicator |
| ⚡ **Relay Status** | Live relay module state with animated indicator |
| 🔔 **Smart Notifications** | Contextual alerts for dry soil, pump overtime & rain events |
| 📊 **Analytics** | Water usage & moisture trends — Daily / Weekly / Monthly |
| ⚙️ **Plant Presets** | Configurable moisture thresholds per plant type |
| 🖥️ **ESP32 Status** | Online/Offline connectivity indicator |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     PHYSICAL HARDWARE LAYER                     │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Soil        │  │  DHT11       │  │  Rain Sensor         │  │
│  │  Moisture    │  │  Temp &      │  │  (Digital/Analog)    │  │
│  │  Sensor      │  │  Humidity    │  └──────────────────────┘  │
│  └──────┬───────┘  └──────┬───────┘           │                │
│         │                 │          ┌──────────────────────┐  │
│  ┌──────────────┐         │          │  LDR Light Sensor    │  │
│  │  Battery     │         │          └──────────────────────┘  │
│  │  Supply      │         │                   │                │
│  └──────┬───────┘         └──────────┬────────┘                │
│         │                            │                         │
│         └──────────────┬─────────────┘                         │
│                        ▼                                        │
│              ┌─────────────────┐                               │
│              │   ESP32 MCU     │  ← WiFi / BLE Enabled         │
│              │  (Controller)   │                               │
│              └────────┬────────┘                               │
│                       │                                        │
│              ┌────────▼────────┐                               │
│              │  Relay Module   │                               │
│              └────────┬────────┘                               │
│                       │                                        │
│              ┌────────▼────────┐                               │
│              │  DC Water Pump  │                               │
│              └─────────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
                        │  (Sensor Data via WiFi/Serial)
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND APPLICATION                        │
│                                                                 │
│   React 19 + TypeScript + Vite                                  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    App.tsx (Root)                        │   │
│  │              HashRouter + NotificationProvider           │   │
│  └──────────────────────┬──────────────────────────────────┘   │
│                         │                                       │
│         ┌───────────────┼───────────────┐                      │
│         ▼               ▼               ▼                      │
│   ┌──────────┐   ┌────────────┐  ┌────────────┐               │
│   │  Navbar  │   │   Pages    │  │   Footer   │               │
│   └──────────┘   └─────┬──────┘  └────────────┘               │
│                        │                                       │
│        ┌───────────────┼──────────────────┐                    │
│        ▼               ▼                  ▼                    │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │ HomePage │  │ DashboardPage│  │ AnalyticsPage│             │
│  └──────────┘  └──────┬───────┘  └──────────────┘             │
│                       │                                        │
│        ┌──────────────┼──────────────┐                         │
│        ▼              ▼              ▼                         │
│  ┌──────────┐  ┌────────────┐  ┌──────────┐                   │
│  │   Card   │  │ Circular   │  │AlertCard │                   │
│  │Component │  │ Progress   │  │Component │                   │
│  └──────────┘  └────────────┘  └──────────┘                   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           NotificationContext (Global State)             │   │
│  │   addNotification · dismissNotification · markAsRead     │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Project Structure

```
smart-water-irrigation-system/
│
├── pages/
│   ├── HomePage.tsx          # Landing page with animated hero
│   ├── DashboardPage.tsx     # Live sensor data & pump control
│   ├── AnalyticsPage.tsx     # Water usage & moisture charts
│   ├── SettingsPage.tsx      # Plant presets & threshold config
│   └── AboutPage.tsx         # System info & specs
│
├── components/
│   ├── Navbar.tsx            # Navigation + notification bell
│   ├── Footer.tsx            # App footer
│   ├── Card.tsx              # Glassmorphism card wrapper
│   ├── CircularProgress.tsx  # Animated SVG moisture gauge
│   ├── AlertCard.tsx         # Inline warning/error banners
│   └── icons/Icons.tsx       # Custom icon components
│
├── contexts/
│   └── NotificationContext.tsx  # Global notification state
│
├── App.tsx                   # Root router & layout
├── index.tsx                 # React entry point
├── index.css                 # Global styles & glassmorphism theme
└── vite.config.ts            # Vite build configuration
```

---

## 🤖 Automation Logic

```
Sensor reads moisture every 2 seconds
        │
        ▼
  moisture < 30%?
   AND not raining?
        │
   YES  │  NO
        │──────────────────────────────────────────┐
        ▼                                          ▼
  Activate Relay                           Keep pump OFF
  Start DC Pump                            Monitor sensors
  Send Warning Notification
        │
        ▼
  moisture > 70%
   OR rain detected?
        │
   YES  │  NO
        │──────────────────────────────────────────┐
        ▼                                          ▼
  Deactivate Relay                        Pump running > 20s?
  Stop Pump                                       │
  Send Info Notification                     YES  │
                                                  ▼
                                          Send Error Alert
                                          (Possible leak/fault)
```

---

## 📡 Sensors & Hardware

| Component | Role | Data |
|---|---|---|
| **ESP32** | Main microcontroller | WiFi, logic, relay control |
| **Soil Moisture Sensor** | Measures soil water content | 0–100% |
| **DHT11** | Temperature & humidity | °C, % RH |
| **Rain Sensor** | Detects rainfall | Boolean |
| **LDR (Light Sensor)** | Ambient light level | Lux |
| **Relay Module** | Switches pump on/off | Active / Inactive |
| **DC Water Pump** | Delivers water to soil | Running / Standby |
| **Battery** | Power supply | % charge level |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 |
| **Language** | TypeScript 5.8 |
| **Build Tool** | Vite 6 |
| **Routing** | React Router DOM v7 |
| **Charts** | Recharts 3 |
| **Animations** | Motion (Framer Motion) |
| **Icons** | Lucide React |
| **Styling** | Tailwind CSS + Custom Glassmorphism |
| **AI Integration** | Google Gemini API |

---

## 🚀 Getting Started

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repository
git clone https://github.com/whyysee12/Smart-Irrigation-System.git
cd Smart-Irrigation-System

# 2. Install dependencies
npm install

# 3. Add your Gemini API key
# Edit .env.local and set:
GEMINI_API_KEY=your_api_key_here

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📸 Pages

- **Home** — Animated landing page with system intro
- **Dashboard** — Live telemetry, sensor cards, pump control, real-time area chart
- **Analytics** — Bar & area charts for water usage and moisture trends (Day/Week/Month)
- **Settings** — Plant type presets (Vegetables, Flowers, Succulents, Lawn) with adjustable moisture threshold
- **About** — Hardware specs and system description

---

<div align="center">

Made with ❤️ by [whyysee12](https://github.com/whyysee12)

</div>
