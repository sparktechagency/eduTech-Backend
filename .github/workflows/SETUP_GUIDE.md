# 🚀 GitHub Profile README Setup Guide

এই গাইড আপনাকে দেখাবে কিভাবে real-time stats সহ একটি professional GitHub profile তৈরি করবেন।

## 📋 Step-by-Step Setup

### 1️⃣ Repository তৈরি করুন

1. GitHub এ যান এবং একটি **new repository** তৈরি করুন
2. Repository এর নাম আপনার username এর মতই হতে হবে: `azizulhoq953`
3. Public করুন
4. "Add a README file" চেক করুন
5. Create repository ক্লিক করুন

### 2️⃣ README.md আপডেট করুন

1. Repository তে গিয়ে README.md ফাইল edit করুন
2. `README_UPDATED.md` ফাইলের সব content কপি করুন
3. পুরাতন content মুছে নতুন content paste করুন
4. Commit করুন

### 3️⃣ GitHub Actions Setup করুন

#### Workflow ফাইল যোগ করুন:

1. আপনার repository তে `.github/workflows` folder তৈরি করুন
2. এই folder এ দুটি ফাইল তৈরি করুন:

**File 1: `.github/workflows/update-readme.yml`**
- `update-readme.yml` ফাইলের content কপি করুন
- এটি প্রতি 6 ঘণ্টায় আপনার recent activity update করবে

**File 2: `.github/workflows/snake.yml`**
- `snake.yml` ফাইলের content কপি করুন
- এটি প্রতিদিন contribution snake animation তৈরি করবে

### 4️⃣ Actions Enable করুন

1. Repository এর **Settings** এ যান
2. Left sidebar থেকে **Actions** > **General** select করুন
3. "Allow all actions and reusable workflows" select করুন
4. Save করুন

### 5️⃣ Workflow Permission দিন

1. Settings > Actions > General এ scroll করুন
2. **Workflow permissions** section এ যান
3. "Read and write permissions" select করুন
4. "Allow GitHub Actions to create and approve pull requests" চেক করুন
5. Save করুন

### 6️⃣ Manual Workflow Run করুন

1. Repository এর **Actions** tab এ যান
2. "Update README" workflow select করুন
3. "Run workflow" ক্লিক করুন
4. একইভাবে "Generate Snake" workflow ও run করুন

---

## ✅ যা যা হবে:

### Real-time Updates:
- ✨ GitHub Stats (commits, stars, PRs)
- 🔥 Contribution Streak
- 📊 Activity Graph
- 🏆 Trophies
- 🐍 Snake Animation
- 💬 Random Dev Quote
- 📝 Recent Activity (last 5 activities)

### Auto-Update Schedule:
- **Recent Activity**: প্রতি 6 ঘণ্টায় update
- **Snake Animation**: প্রতিদিন update
- **Stats Cards**: Real-time (প্রতিবার page load এ)

---

## 🎨 Customization

### Username পরিবর্তন করুন:
সব জায়গায় `azizulhoq953` এর বদলে আপনার GitHub username দিন

### Theme পরিবর্তন করুন:
- `tokyonight` → অন্য theme (radical, dark, merko, gruvbox, etc.)

### Stats Hide/Show করুন:
README.md তে যেকোনো section comment out বা remove করতে পারেন

---

## 🔧 Troubleshooting

### যদি Actions কাজ না করে:
1. Repository Settings > Actions permissions check করুন
2. Workflow permissions "Read and write" দেওয়া আছে কিনা check করুন
3. YAML file এর syntax ঠিক আছে কিনা verify করুন

### যদি Snake animation না দেখায়:
1. প্রথমে manually workflow run করুন
2. কিছু contribution থাকতে হবে (commits/PRs)
3. `output` branch তৈরি হয়েছে কিনা check করুন

---

## 📚 Additional Resources

- [GitHub Profile README Generator](https://rahuldkjain.github.io/gh-profile-readme-generator/)
- [Awesome GitHub Profile README](https://github.com/abhisheknaiidu/awesome-github-profile-readme)
- [GitHub Stats Cards Documentation](https://github.com/anuraghazra/github-readme-stats)

---

## 💡 Pro Tips

1. **Regular Commits**: প্রতিদিন কিছু না কিছু commit করুন
2. **Quality Code**: clean এবং documented code লিখুন
3. **Open Source**: অন্যদের project এ contribute করুন
4. **Portfolio Projects**: showcase করার মত projects তৈরি করুন
5. **Pin Repositories**: আপনার best 6টি repository pin করুন

---

## 🎯 Next Steps

- [ ] README.md আপডেট করুন
- [ ] GitHub Actions setup করুন
- [ ] Email এবং social links আপডেট করুন
- [ ] Best projects pin করুন
- [ ] Bio লিখুন
- [ ] Profile picture আপডেট করুন

---

**Happy Coding! 🚀**
