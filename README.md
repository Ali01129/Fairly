# Fairly - Smart Expense Splitting & Group Bill Manager

**Fairly** is a modern, cross-platform expense splitting app that makes managing shared costs easy and fair. Whether you're splitting bills with roommates, tracking expenses on a trip, or managing group finances with friends, Fairly ensures everyone pays their fair share with transparency and simplicity.

## What is Fairly?

Fairly is a mobile and web application built with React Native and Expo that helps groups of people track expenses, split bills fairly, and settle payments instantly. It eliminates the awkwardness of asking "who owes what" by providing real-time balance calculations, detailed activity history, and smart settlement recommendations.

Perfect for:

- **Roommates**: Track shared rent, utilities, and household expenses
- **Travel Groups**: Split trip costs including accommodation, meals, and activities
- **Friend Groups**: Keep track of group outings, dinners, and shared purchases
- **Couples**: Manage shared finances and expenses with your partner
- **Work Groups**: Organize team lunches, office supplies, and event costs

---

## ✨ Key Features

### 💰 Smart Expense Splitting

- **Flexible Split Options**: Split expenses equally, by custom amounts, or by item
- **Custom Categories**: Organize expenses by type (food, transport, accommodation, etc.)
- **Real-time Calculations**: Instantly see who owes what with automatic balance tracking
- **Currency Support**: Works with multiple currencies for international groups

### 👥 Group Management

- **Multiple Group Types**: Create groups for trips, roommates, friends, couples, or other purposes
- **Easy Member Management**: Add, remove, or manage group members
- **Group Profiles**: Customize group names, colors, and icons
- **Activity Tracking**: See a complete history of all expenses and payments

### 💵 Payment Settlement

- **Smart Settlement Suggestions**: Get optimal payment recommendations to settle all debts
- **Balance Overview**: View who owes you and who you owe at a glance
- **Payment Tracking**: Record payments and automatically clear balances
- **Multiple Payment Methods**: Track payments by various methods

### 📊 Insights & Analytics

- **Spending Analytics**: Visualize spending patterns and trends
- **Group Insights**: See breakdown of who spent the most and who owes the most
- **Personal Balances**: Track your net balance across all groups
- **Activity Timeline**: Review all transactions in chronological order

### 🎨 User-Friendly Interface

- **Modern Design**: Clean, intuitive UI built with NativeWind and Tailwind CSS
- **Dark Mode Support**: Automatic theme switching based on system preferences
- **Cross-Platform**: Available on iOS, Android, and web browsers
- **Fast Performance**: Optimized for smooth, responsive experience

### 🔒 Security & Privacy

- **Local Data**: Works seamlessly with offline-first architecture
- **User Profiles**: Manage your account and preferences
- **Group Privacy**: Control who can access and modify group data

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (for mobile development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/fairly.git
   cd fairly
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on your device/simulator**
   - **iOS**: Press `i` and select your simulator
   - **Android**: Press `a` and ensure your emulator is running
   - **Web**: Press `w` to open in your browser

### Development Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint code quality checks

---

## 🛠️ Technology Stack

**Frontend:**

- React Native & React 19
- Expo Router for navigation
- NativeWind + Tailwind CSS for styling
- TypeScript for type safety

**Build & Development:**

- Expo SDK 54
- Metro bundler
- React Navigation
- Native Wind for cross-platform styling

**Additional Libraries:**

- React Native Reanimated for animations
- React Native Gesture Handler for touch interactions
- Expo Icons (Feather icons)
- Safe Area Context for proper layout

---

## 📁 Project Structure

```
fairly/
├── app/                      # Navigation & screens
│   ├── (tabs)/              # Tab-based navigation screens
│   │   ├── index.tsx        # Home screen - group overview
│   │   ├── activity.tsx     # Activity history
│   │   ├── insights.tsx     # Analytics & spending insights
│   │   └── setting.tsx      # User settings
│   └── group/               # Group-specific screens
│       ├── [groupId].tsx    # Group details
│       ├── add-expense.tsx  # Add new expense
│       ├── settle-up.tsx    # Settlement screen
│       └── new-group.tsx    # Create new group
├── components/              # Reusable UI components
├── constants/               # Types, theme, and mock data
├── hooks/                   # Custom React hooks
├── assets/                  # Images and icons
└── styles/                  # Global styling (Tailwind config)
```

---

## 🎯 How to Use Fairly

1. **Create a Group**: Start by creating a new group (trip, roommates, friends, etc.)
2. **Add Members**: Invite friends or family members to your group
3. **Record Expenses**: Add expenses as they happen - who paid and for what
4. **Choose Split Method**: Decide how to split the expense (equally, custom amounts, etc.)
5. **Track Balances**: See real-time calculations of who owes what
6. **Settle Up**: Follow settlement suggestions to clear debts efficiently
7. **View Analytics**: Track spending patterns and group insights

---

## 📱 Platform Support

- **iOS**: iPhone and iPad support
- **Android**: Full Android device support with edge-to-edge display
- **Web**: Responsive web version for desktop and tablet browsers

---

## 🤝 Contributing

Contributions are welcome! This project helps people manage shared finances fairly. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤔 FAQ

**Q: Is my data secure?**
A: Fairly is designed with privacy in mind. Data handling follows best practices for mobile applications.

**Q: Can I use Fairly offline?**
A: Yes! Fairly works offline-first, syncing when you're back online.

**Q: Does Fairly support multiple currencies?**
A: Yes, Fairly supports multiple currencies for international groups and travelers.

**Q: How do I delete a group?**
A: You can manage groups in your settings. Groups can be archived or deleted from the group management screen.

**Q: Can I export my expense data?**
A: Check the settings screen for export options and data management features.

---

## 💡 Tips for Best Results

- **Regular Updates**: Add expenses immediately after they happen for accuracy
- **Clear Descriptions**: Use clear expense descriptions so everyone knows what was paid for
- **Regular Settlements**: Settle up regularly to avoid large outstanding balances
- **Group Discussions**: Use the app to facilitate discussions about fair cost splitting

---

## 🐛 Report Issues

Found a bug? Have a feature request? Please open an issue on GitHub with details and steps to reproduce.

---

## 📞 Support

For support, questions, or feedback, please open an issue on the GitHub repository.

---

**Make expense splitting fair. Choose Fairly.**
