import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function recordDemo() {
  const videoDir = path.resolve('./demo-video');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  console.log('🎬 Launching Chromium for high-res 1080p demo recording...');
  const browser = await chromium.launch({
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();

  // 1. Maintain Current Browser State / Realistic Initial Data before load
  await page.addInitScript(() => {
    const realisticInitialQuestions = [
      {
        id: 1,
        title: 'Two Sum',
        category: 'DSA',
        difficulty: 'Easy',
        status: 'Completed'
      },
      {
        id: 2,
        title: 'Wrong Branch, Correct Work',
        category: 'GitHub',
        difficulty: 'Medium',
        status: 'Completed'
      },
      {
        id: 3,
        title: 'Merge Conflict During PR',
        category: 'GitHub',
        difficulty: 'Medium',
        status: 'In Progress'
      },
      {
        id: 4,
        title: 'JavaScript Async Flow',
        category: 'Technical',
        difficulty: 'Medium',
        status: 'Pending'
      },
      {
        id: 5,
        title: 'Machine Coding: Infinite Scroll Component',
        category: 'Technical',
        difficulty: 'Hard',
        status: 'In Progress'
      }
    ];

    localStorage.setItem('initialQuestions', JSON.stringify(realisticInitialQuestions));

    // Sleek visible cursor helper for high-clarity video demonstration
    window.addEventListener('DOMContentLoaded', () => {
      const cursor = document.createElement('div');
      cursor.id = 'playwright-demo-cursor';
      cursor.style.position = 'fixed';
      cursor.style.top = '0';
      cursor.style.left = '0';
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.borderRadius = '50%';
      cursor.style.backgroundColor = 'rgba(37, 99, 235, 0.7)';
      cursor.style.border = '2px solid rgba(255, 255, 255, 0.9)';
      cursor.style.boxShadow = '0 0 12px rgba(37, 99, 235, 0.6)';
      cursor.style.pointerEvents = 'none';
      cursor.style.zIndex = '999999';
      cursor.style.transition = 'transform 0.15s ease, background-color 0.15s ease';
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      document.body.appendChild(cursor);

      window.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });

      window.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.75)';
        cursor.style.backgroundColor = 'rgba(29, 78, 216, 0.95)';
      });

      window.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'rgba(37, 99, 235, 0.7)';
      });
    });
  });

  const url = process.env.APP_URL || 'http://localhost:5173';
  console.log(`🌐 Navigating to PrepTracker at ${url}...`);

  await page.goto(url, { waitUntil: 'networkidle' });
  await sleep(1500);

  // Smooth cursor glide over candidate workspace & header
  console.log('✨ Showcasing Navigation Bar & Candidate Workspace...');
  await page.mouse.move(960, 45, { steps: 20 });
  await sleep(1200);

  // Hover over the 4 Metric Cards with realistic counts
  console.log('📊 Showcasing Top Metric Cards & Hover Elevations...');
  const statCards = page.locator('section.grid > div');
  const cardCount = await statCards.count();
  for (let i = 0; i < Math.min(cardCount, 4); i++) {
    const card = statCards.nth(i);
    const box = await card.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 15 });
      await sleep(1000);
    }
  }

  // Hover over the Target Mock Interview Banner
  console.log('🎯 Showcasing Target Mock Interview Banner...');
  const targetBanner = page.locator('text=Target: Clear Weekly Mock Interview').first();
  const bannerBox = await targetBanner.boundingBox();
  if (bannerBox) {
    await page.mouse.move(bannerBox.x + 120, bannerBox.y + 40, { steps: 15 });
    await sleep(1500);
  }

  // Interactive Category Buttons
  console.log('🏷️ Showcasing Interactive Category Filtering...');
  const categories = ['DSA', 'GitHub', 'Technical', 'All'];
  for (const cat of categories) {
    const filterBtn = page.getByRole('button', { name: cat, exact: true });
    await filterBtn.hover();
    await sleep(400);
    await filterBtn.click();
    console.log(`   Selected Category filter: ${cat}`);
    await sleep(1200);
  }

  // 2. Visible Dropdown Interactions (Status & Difficulty)
  console.log('🔽 Showcasing Visible Dropdown Filter Interactions...');
  const filterSection = page.locator('section').filter({ hasText: 'Filter:' });
  const statusFilter = filterSection.locator('select').nth(0);
  const difficultyFilter = filterSection.locator('select').nth(1);

  // Status dropdown filter: click -> wait -> select "Completed" -> verify filter -> reset
  await statusFilter.hover();
  await sleep(500);
  await statusFilter.click();
  console.log('   Clicked Status filter dropdown');
  await sleep(800);
  await statusFilter.selectOption('Completed');
  console.log('   Selected Status: Completed');
  await sleep(1500);

  await statusFilter.hover();
  await sleep(400);
  await statusFilter.click();
  await sleep(600);
  await statusFilter.selectOption('All');
  console.log('   Reset Status: All');
  await sleep(1200);

  // Difficulty dropdown filter: click -> wait -> select "Medium" -> verify filter -> reset
  await difficultyFilter.hover();
  await sleep(500);
  await difficultyFilter.click();
  console.log('   Clicked Difficulty filter dropdown');
  await sleep(800);
  await difficultyFilter.selectOption('Medium');
  console.log('   Selected Difficulty: Medium');
  await sleep(1500);

  await difficultyFilter.hover();
  await sleep(400);
  await difficultyFilter.click();
  await sleep(600);
  await difficultyFilter.selectOption('All');
  console.log('   Reset Difficulty: All');
  await sleep(1200);

  // Form Entry: Add a new problem
  console.log('✍️ Filling out Question Form with new problem...');
  const questionForm = page.locator('form');
  const titleInput = questionForm.locator('input[type="text"]');
  await titleInput.click();
  await sleep(400);
  await titleInput.pressSequentially('Graph BFS Traversal', { delay: 60 });
  await sleep(600);

  const formCategorySelect = questionForm.locator('select').nth(0);
  await formCategorySelect.click();
  await sleep(400);
  await formCategorySelect.selectOption('DSA');
  await sleep(600);

  const formDifficultySelect = questionForm.locator('select').nth(1);
  await formDifficultySelect.click();
  await sleep(400);
  await formDifficultySelect.selectOption('Medium');
  await sleep(600);

  const formStatusSelect = questionForm.locator('select').nth(2);
  await formStatusSelect.click();
  await sleep(400);
  await formStatusSelect.selectOption('Completed');
  await sleep(800);

  const saveBtn = questionForm.getByRole('button', { name: 'Save Question' });
  await saveBtn.hover();
  await sleep(600);
  await saveBtn.click();
  console.log('   Saved new question: Graph BFS Traversal');
  await sleep(1800);

  // Demonstrate real-time search
  console.log('🔍 Showcasing Real-time Search Filter...');
  const searchInput = page.getByPlaceholder('Search problems, topics...');
  await searchInput.click();
  await sleep(400);
  await searchInput.pressSequentially('Graph', { delay: 80 });
  console.log('   Typed "Graph" in search bar');
  await sleep(1800);

  await searchInput.fill('');
  console.log('   Cleared search input');
  await sleep(1200);

  // 3. Proper Edit / Update Demonstration
  console.log('✏️ Showcasing In-place Problem Update flow on "JavaScript Async Flow"...');
  // Scroll to table row
  const rowToEdit = page.locator('tbody tr').filter({ hasText: 'JavaScript Async Flow' });
  await rowToEdit.scrollIntoViewIfNeeded();
  await sleep(800);

  const editBtn = rowToEdit.getByRole('button', { name: 'Update' });
  await editBtn.hover();
  await sleep(500);
  await editBtn.click();
  console.log('   Clicked Update on "JavaScript Async Flow"');
  await sleep(1000);

  // Scroll smoothly up to QuestionForm in Editing state
  await questionForm.scrollIntoViewIfNeeded();
  await sleep(800);

  // Edit Title
  await titleInput.click();
  await sleep(400);
  await titleInput.fill('');
  await sleep(300);
  await titleInput.pressSequentially('JavaScript Event Loop & Microtasks', { delay: 50 });
  await sleep(600);

  // Edit Status to Completed
  await formStatusSelect.click();
  await sleep(500);
  await formStatusSelect.selectOption('Completed');
  console.log('   Changed Status to Completed in edit form');
  await sleep(700);

  const saveChangesBtn = questionForm.getByRole('button', { name: 'Save Changes' });
  await saveChangesBtn.hover();
  await sleep(500);
  await saveChangesBtn.click();
  console.log('   Saved updated changes');
  await sleep(1800);

  // 4. Add Delete Demonstration
  console.log('🗑️ Showcasing Delete action on "Merge Conflict During PR"...');
  const rowToDelete = page.locator('tbody tr').filter({ hasText: 'Merge Conflict During PR' });
  await rowToDelete.scrollIntoViewIfNeeded();
  await sleep(800);

  const deleteBtn = rowToDelete.getByRole('button', { name: 'Delete' });
  await deleteBtn.hover();
  await sleep(600);
  await deleteBtn.click();
  console.log('   Clicked Delete on "Merge Conflict During PR"');
  await sleep(1800); // Visibly observe row removal and counter decrement

  // Final settled view showcasing entire populated dashboard
  console.log('📋 Showcasing Full Table & Final Settled View...');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await sleep(1500);
  await page.mouse.move(960, 450, { steps: 15 });
  await sleep(2500);

  // Finalizing recording
  console.log('💾 Finalizing and saving recording...');
  const video = page.video();
  await context.close();
  await browser.close();

  if (video) {
    const rawVideoPath = await video.path();
    const finalVideoPath = path.join(videoDir, 'preptracker-demo.webm');
    try {
      fs.copyFileSync(rawVideoPath, finalVideoPath);
      console.log(`✅ Demo video successfully recorded!`);
      console.log(`🎥 Raw Video: ${rawVideoPath}`);
      console.log(`🎥 Named Demo: ${finalVideoPath}`);
    } catch {
      console.log(`✅ Demo video saved at: ${rawVideoPath}`);
    }
  }
}

recordDemo().catch((err) => {
  console.error('❌ Error recording demo video:', err);
  process.exit(1);
});
