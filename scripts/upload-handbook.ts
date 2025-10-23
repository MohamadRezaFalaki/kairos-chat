import { config } from 'dotenv';
import { resolve } from 'path';

// ✅ Load .env.local before anything else
config({ path: resolve(process.cwd(), '.env.local') });

// Now import the rest
import { uploadDocument } from '@/lib/rag/document-processor';

async function main() {
    console.log('🔌 Using DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));

    const handbookContent = `# Kairos Handbook - Complete User Guide

**Version 1.0**  
**Last Updated:** January 2025  
**Developed by:** Quant Labs  
**Powered by:** Butterfly Data Infrastructure

---

## Table of Contents

1. [Critical Disclaimer](#critical-disclaimer)
2. [Introduction to Kairos](#introduction-to-kairos)
3. [Getting Started](#getting-started)
4. [Understanding the Interface](#understanding-the-interface)
5. [Core Concepts](#core-concepts)
6. [Analytical Use Cases](#analytical-use-cases)
7. [How Kairos Works](#how-kairos-works)
8. [FAQ](#faq)
9. [Critical Reminders](#critical-reminders)
10. [Resources & Support](#resources-support)

---

## Critical Disclaimer

### READ THIS BEFORE USING KAIROS

**IMPORTANT: Understanding What Kairos Is and Isn't**

#### KAIROS IS:
- A market intelligence platform developed by Quant Labs
- A pattern detection system using statistical models
- A data visualization tool powered by Butterfly infrastructure
- A performance transparency platform showing historical model behavior
- An analytical assistant supporting YOUR independent decision-making
- A research tool for understanding market microstructure patterns

#### KAIROS IS NOT:
- Financial advice or investment recommendations
- A trading signal service or "buy/sell" system
- A strategy to blindly follow or automated trading bot
- A guarantee, prediction, or promise of future market behavior
- A decision-making system that replaces your judgment
- Sufficient alone for making trading or investment decisions
- A replacement for professional financial advisors
- A risk-free or guaranteed profit system

### Your Legal and Financial Responsibilities

#### YOU MUST UNDERSTAND:

**1. All Trading Involves Substantial Risk**
- You can lose some or ALL of your invested capital
- Cryptocurrency markets are highly volatile and unpredictable
- Leverage amplifies both gains and losses catastrophically
- Past performance has NO predictive value for future results
- No analytical tool can eliminate or guarantee against losses

**2. You Are Solely Responsible**
- ALL trading and investment decisions are YOURS alone
- You must conduct comprehensive independent analysis
- You must determine appropriate position sizing and risk management
- You accept full responsibility for all outcomes, positive or negative
- Kairos developers and Quant Labs are not liable for your trading results

**3. Technical Analysis Is Insufficient Alone**
- Markets are influenced by fundamentals, macroeconomics, sentiment, news, regulation, and countless other factors
- Technical patterns represent ONE dimension of market analysis
- You must integrate multiple analytical frameworks
- Never rely on a single tool, indicator, or methodology
- Comprehensive analysis requires fundamental research, macro context, sentiment analysis, and more

**4. Seek Professional Advice**
- Consult qualified financial advisors for personalized guidance
- Tax professionals for tax implications of trading
- Legal counsel for regulatory compliance questions
- Mental health professionals if trading affects your wellbeing

#### CRITICAL UNDERSTANDING OF PERFORMANCE METRICS

**Why We Don't Show "Overall Performance"**

Kairos displays individual discovery outcomes and historical statistics, but deliberately does NOT provide aggregated "strategy performance" metrics. Here's why:

**Models Detect Patterns, Not Trading Strategies**
- Discoveries show where patterns were detected and how they historically behaved
- Your trading outcomes depend on YOUR execution, not model detection
- Performance varies based on: entry timing, position sizing, exit discipline, risk management, market conditions, costs, and emotional discipline

**You Cannot Replicate Model Metrics**
- Discovery tracked from detection moment (you likely enter later)
- Your position size affects execution quality
- Your stops and exits differ from target tracking
- Slippage, fees, and spread erode returns
- Emotional decisions impact real-world execution
- Leverage changes risk/reward dynamics entirely

**What Historical Data Shows**
- How similar patterns HAVE behaved in the past
- Statistical context for decision-making
- Transparent model accountability
- Drawdown magnitudes and target hit rates

**What Historical Data Does NOT Show**
- How YOU will perform trading these patterns
- What returns YOU should expect
- That future discoveries will behave identically
- Optimal entry/exit timing for YOUR strategy

### Specific Risk Disclosures

**Market Risks:**
- Extreme volatility can cause rapid losses
- "Flash crashes" can trigger stop-losses prematurely
- Liquidity can vanish during stress, preventing exits
- Correlation increases during crises (diversification fails)
- Black swan events occur regularly in crypto markets

**Operational Risks:**
- Exchange outages can prevent trading during critical moments
- Wallet security breaches can result in total loss
- Regulatory changes can freeze assets or ban trading
- Network congestion can delay transactions
- Smart contract vulnerabilities exist in DeFi protocols

**Psychological Risks:**
- Emotional decision-making destroys trading capital
- FOMO (fear of missing out) leads to poor entries
- Revenge trading after losses compounds problems
- Overconfidence after wins increases risk-taking
- Analysis paralysis can prevent decisive action

**Leverage Risks:**
- Leverage amplifies losses as much as gains
- Liquidation can occur from small adverse moves
- Funding rates erode returns on perpetual contracts
- Margin calls force exits at worst possible times
- Leverage dramatically reduces margin for error

### Health and Wellbeing Warning

**Trading Can Become Addictive**

Trading activates similar neural pathways as gambling. Warning signs include:
- Obsessively checking prices (constantly, during sleep, at work)
- Inability to close losing positions
- Increasing position sizes after losses
- Hiding trading activity from family or partners
- Using credit or borrowed money to trade
- Neglecting work, relationships, or health
- Feeling euphoric after wins, devastated after losses
- Making impulsive decisions without analysis

**If you recognize these patterns, STOP TRADING and seek help from mental health professionals. Trading addiction is a serious condition requiring intervention.**

### When NOT to Use Kairos

**Do Not Use Kairos When:**
- You're experiencing financial stress or desperation
- You're trading with money needed for living expenses
- You're using borrowed money or credit
- You're feeling emotional (fear, greed, anger, revenge)
- You're under the influence of substances
- You haven't slept adequately
- You're experiencing mental health symptoms
- You don't understand what discoveries represent
- You're looking for "get rich quick" opportunities

### Legal Compliance

**Regulatory Status:**
- Kairos is an analytical tool, not a registered investment advisor
- Users must comply with regulations in their jurisdiction
- Some jurisdictions prohibit or restrict cryptocurrency trading
- Tax obligations apply to trading gains
- KYC/AML requirements may apply through exchanges

**User Obligations:**
- Verify trading is legal in your jurisdiction
- Report and pay taxes on trading activity
- Comply with exchange terms of service
- Understand and follow applicable regulations
- Maintain records for tax and regulatory purposes

### Acknowledgment Required

**By using Kairos, you acknowledge that you have:**
- Read and understood this complete disclaimer
- Understood that Kairos is NOT financial advice
- Accepted that you are solely responsible for all decisions
- Agreed that past performance does not predict future results
- Understood the substantial risks of cryptocurrency trading
- Confirmed you can afford to lose your entire trading capital
- Agreed to conduct independent comprehensive analysis
- Accepted full responsibility for all trading outcomes
- Committed to using Kairos as ONE tool among many
- Agreed to seek professional advice when appropriate

**If you do not understand or agree with any part of this disclaimer, DO NOT USE KAIROS.**

---

## Introduction to Kairos

### What Is Kairos?

Kairos is a market intelligence platform that brings institutional-grade quantitative analysis to cryptocurrency traders and investors. Built by Quant Labs and powered by Butterfly's data infrastructure, Kairos applies sophisticated statistical models to detect patterns in market microstructure.

**The Technology Stack:**

**Quant Labs** (Parent Company)
- Quantitative research and model development
- Non-parametric statistical methodology
- Pattern detection algorithms
- Performance tracking systems

**Butterfly** (Data Infrastructure)
- Tick-level data collection since asset inception
- Real-time processing and quality control
- Billions of data points with validation
- High-throughput, low-latency delivery

**Kairos** (Intelligence Platform)
- User interface and visualization
- Real-time pattern tracking
- Historical performance transparency
- Multi-timeframe analysis

**Think of it this way:**
- Butterfly provides high-quality fuel (institutional-grade data)
- Quant Labs engineers the machine (sophisticated statistical models)
- Kairos is the dashboard (showing what models detect)
- You are the driver (making all decisions)

### The Philosophy Behind Kairos

**Transparency Over Promises**

Unlike signal services that claim high win rates without accountability, Kairos operates on radical transparency:
- Every discovery is tracked from detection to resolution
- All outcomes are displayed, including failures
- Historical statistics are complete and unfiltered
- No cherry-picking or survivorship bias

**Intelligence Over Signals**

Kairos doesn't tell you what to do. Instead, it:
- Shows where statistical models detect patterns
- Provides context about historical pattern behavior
- Tracks outcomes with complete transparency
- Empowers YOUR independent analysis

**Quality Over Quantity**

Butterfly's infrastructure ensures:
- Every tick of data since asset listing
- Rigorous quality control and validation
- No gaps, no garbage data
- Research-grade precision

### What Makes Kairos Different

**vs. Signal Services:**
- Kairos: Transparent pattern detection with full historical tracking
- Signals: Black-box recommendations with cherry-picked results

**vs. Technical Indicators:**
- Kairos: Microstructure analysis on tick-level data
- Indicators: Simplified price transformations on OHLC data

**vs. Social Trading:**
- Kairos: Statistical pattern detection independent of human bias
- Social: Following traders with unknown edge and survivorship bias

**vs. Backtested Strategies:**
- Kairos: Forward-tracked real discoveries, no hindsight
- Backtests: Optimized on historical data, often overfit

### The Kairos Workflow

**1. Data Collection (Butterfly)**
\`\`\`
Exchange Ticks → Quality Control → Storage → Processing
\`\`\`

**2. Pattern Detection (Quant Labs Models)**
\`\`\`
Microstructure Analysis → Statistical Matching → Threshold Evaluation → Discovery Generation
\`\`\`

**3. Visualization (Kairos Interface)**
\`\`\`
Discovery Display → Real-time Tracking → Historical Context → Performance Statistics
\`\`\`

**4. User Analysis (You)**
\`\`\`
Independent Validation → Risk Assessment → Decision Making → Position Management
\`\`\`

### Who Should Use Kairos

**Appropriate User Profiles:**

**Active Traders**
- Day traders and scalpers seeking pattern confirmation
- Swing traders looking for multi-day setups
- Those with existing strategies needing validation
- Experienced traders comfortable with risk

**Portfolio Managers**
- Managing diversified crypto portfolios
- Seeking rebalancing signals and timing context
- Analyzing relative strength across assets
- Professionals with risk management frameworks

**Quantitative Researchers**
- Developing trading strategies
- Validating hypotheses with empirical data
- Studying market microstructure
- Academic or institutional research

**Sophisticated Investors**
- Long-term holders seeking entry timing refinement
- DCA practitioners wanting tactical adjustments
- Options traders needing directional bias
- Those integrating multiple analytical frameworks

**Inappropriate User Profiles:**

**Beginners Without Foundation**
- No understanding of market mechanics
- No existing trading methodology
- No risk management discipline
- Looking for "easy money"

**Emotional or Desperate Traders**
- Trading with needed living expenses
- Seeking to recover past losses quickly
- Unable to accept losses
- Compulsive or addictive tendencies

**Passive Signal Followers**
- Wanting to be told what to do
- Unwilling to conduct independent analysis
- Looking for guaranteed profits
- Not accepting personal responsibility

### Prerequisites for Success

**Before Using Kairos, You Should Have:**

**Knowledge:**
- Understanding of market mechanics (order books, liquidity, spreads)
- Familiarity with technical analysis concepts
- Grasp of risk management principles
- Basic statistical thinking

**Experience:**
- Track record of actual trading (paper or real)
- Experience managing losing positions
- History of following a trading plan
- Understanding of your own psychology

**Resources:**
- Capital you can afford to lose completely
- Time for proper analysis and monitoring
- Access to additional research resources
- Professional advisors when needed

**Discipline:**
- Written trading plan with rules
- Position sizing methodology
- Stop-loss discipline
- Emotional control systems

**If you lack these prerequisites, invest in education and practice before using sophisticated tools like Kairos.**

### Setting Realistic Expectations

**What Kairos Can Do:**
- Detect statistical patterns in market microstructure
- Provide historical context for pattern behavior
- Track discoveries with complete transparency
- Enhance your existing analytical process

**What Kairos Cannot Do:**
- Predict future price movements
- Guarantee profitable trades
- Replace comprehensive analysis
- Make decisions for you
- Eliminate market risk

**Realistic Outcomes:**
- Some discoveries will work, many will fail
- Drawdowns will occur even on successful patterns
- Your results will differ from model statistics
- Losses are inevitable and normal
- Success requires discipline beyond pattern detection

### Getting Help

**When to Seek Additional Support:**

**Financial Advisors**
- For personalized investment strategy
- Portfolio allocation guidance
- Tax-efficient trading approaches
- Retirement and long-term planning

**Mental Health Professionals**
- If trading affects your wellbeing
- Compulsive trading behaviors
- Stress or anxiety from trading
- Relationship problems due to trading

**Trading Coaches**
- Improving execution discipline
- Managing trading psychology
- Developing systematic approaches
- Performance review and improvement

**Technical Support**
- Platform issues or bugs
- Data discrepancies
- Feature questions
- Account assistance

**[Screenshot Placeholder: Kairos Dashboard Overview]**
*Caption: Main dashboard showing Market Outlook, Opportunities, and Risk Alerts sections*

---

## Getting Started

### System Requirements

**Supported Browsers:**
- Chrome 90+ (recommended)
- Edge 90+
- Firefox 88+
- Safari 14+

**Recommended Hardware:**
- Modern processor (2015 or newer)
- 4GB RAM minimum, 8GB recommended
- Stable internet connection (10+ Mbps)
- Screen resolution 1280x720 minimum

**Not Supported:**
- Internet Explorer
- Very old browser versions
- Extremely slow connections

### First Login and Account Setup

**Step 1: Create Your Account**

1. Navigate to [kairos.quantlabs.com]
2. Click "Sign Up" or "Get Started"
3. Provide required information:
   - Email address
   - Secure password (min 12 characters)
   - Accept Terms of Service (after reading)
   - Verify email address

**[Screenshot Placeholder: Registration Screen]**
*Caption: Account creation form with email, password, and terms acceptance*

**Step 2: Complete Profile**

Navigate to Profile section (bottom of sidebar):
1. Full name (optional but recommended)
2. Trading experience level
3. Preferred communication settings
4. Timezone selection

**[Screenshot Placeholder: Profile Settings Page]**
*Caption: Profile settings with personal information and preferences*

**Step 3: Review Disclaimers**

On first login, you'll see:
- Complete disclaimer modal (must acknowledge)
- Quick-start guide option
- Handbook access link
- Support resources

**Take time to read the disclaimer completely. This is not legal boilerplate - it contains critical information about using Kairos responsibly.**

### Interface Overview

**[Screenshot Placeholder: Full Dashboard Annotated]**
*Caption: Complete dashboard with callouts identifying each major section*

**Main Components:**

**1. Sidebar Navigation (Left)**
- Market Outlook (eye icon)
- Opportunities (target icon)
- Risk Alerts (shield icon)
- Handbook (book icon)
- Profile (user icon)

**2. Header Controls (Top)**
- Model selector (Hunter S1 / S2)
- Base Assets filter
- Quote Assets / Denominator filter
- Risk Profile selector (Conservative/Moderate/Aggressive)
- Auto-update controls (Live/Paused)
- Manual refresh button

**3. Main Content Area (Center)**
- Discovery cards or lists
- Detail panels
- Performance tracking
- Progress visualizations

**4. Footer Controls (Bottom)**
- Pagination controls
- Per-page selector
- Sort order toggle
- Page numbers

### Configuring Your First View

**Step 1: Select Base Assets**

Base assets are the cryptocurrencies you want to analyze.

1. Click the "Base Assets" filter in header
2. Search or scroll through available assets
3. Click assets to select/deselect
4. Selected assets show with checkmark
5. Preview shows selected count and icons

**Recommendations:**
- Start with assets you understand fundamentally
- Focus on liquid markets (high volume)
- Don't select everything - be selective
- Consider assets you already trade

**[Screenshot Placeholder: Base Assets Selector Modal]**
*Caption: Asset selection modal showing search, asset list, and selection checkmarks*

**Step 2: Choose Denominator (Quote Asset)**

The denominator determines how performance is measured.

**Options:**
- **USDT**: Measures performance vs US dollar (most common)
- **BTC**: Measures performance vs Bitcoin
- **ETH**: Measures performance vs Ethereum
- **Other stablecoins**: USDC, BUSD, etc.

**Which to choose?**
- Hold primarily USDT/cash → Use USDT
- Hold primarily BTC → Use BTC (see BTC-relative performance)
- Hold primarily ETH → Use ETH
- Mixed portfolio → Try different denominators to see various perspectives

**Note:** In Market Outlook view, this becomes "Denominator" and you select ONE asset. In Opportunities/Risk Alerts views, you can select multiple quote assets.

**[Screenshot Placeholder: Denominator Selection]**
*Caption: Single denominator selection in Market Outlook mode*

**Step 3: Select Risk Profiles**

Risk profiles are model parameters, NOT your risk tolerance.

**Conservative:**
- Shorter timeframe (minutes to hours)
- Tighter criteria
- More frequent discoveries
- Smaller typical moves
- Higher hit rates

**When to use:**
- Short-term analysis (day trading, scalping)
- Frequent validation points
- Lower magnitude expectations
- Quick pattern resolution

**Moderate:**
- Medium timeframe (hours to days)
- Balanced criteria
- Moderate discovery frequency
- Medium typical moves
- Balanced hit rates

**When to use:**
- Swing trading analysis
- Multi-day holds
- Balanced approach
- Moderate timeframe expectations

**Aggressive:**
- Longer timeframe (days to weeks)
- Wider criteria
- Less frequent discoveries
- Larger typical moves
- Lower hit rates, larger magnitudes

**When to use:**
- Position trading analysis
- Extended hold periods
- Larger move expectations
- Patient approach

**Can select multiple:**
You can select one, two, or all three profiles to see different timeframe perspectives simultaneously.

**[Screenshot Placeholder: Risk Profile Selector]**
*Caption: Button group showing Conservative, Moderate, Aggressive with active selections*

**Step 4: Choose Starting View**

**Market Outlook (Recommended for First-Time Users)**
- Ranked lists of discoveries by potential
- Both upside (opportunities) and downside (risks)
- Best for getting overview of market
- Only shows discoveries that haven't hit T1 yet

**Opportunities**
- Detailed view of upside discoveries
- Complete target tracking
- Historical performance metrics
- Paginated list with full details

**Risk Alerts**
- Detailed view of downside discoveries
- Downside risk tracking
- Recovery zone monitoring
- Paginated list with full details

**[Screenshot Placeholder: Navigation Sidebar]**
*Caption: Sidebar with three main views highlighted*

### Understanding Auto-Update Controls

**Live Mode (Default)**
- Real-time updates as market moves
- New discoveries appear automatically
- Existing discoveries update continuously
- Best for active monitoring

**Paused Mode**
- Freeze current view for analysis
- No automatic updates
- Manual refresh when ready
- Best for deep analysis without distractions

**Manual Refresh Button**
- Force immediate update in any mode
- Useful after changing filters
- Provides instant feedback
- Shows brief animation

**[Screenshot Placeholder: Auto-Update Controls]**
*Caption: Live/Paused toggle and manual refresh button in header*

### Your First Discovery Review

Once filters are configured, you'll see discoveries appear. Let's walk through examining your first discovery.

**Step 1: Navigate to Market Outlook**

Click "Market Outlook" in sidebar. You'll see two columns:
- Left: Upside Potential (ranked opportunities)
- Right: Downside Alert (ranked risks)

**Step 2: Understand the Ranking**

Cards are ranked by "remaining to target 1" percentage. This shows which discoveries have the most "room to run" IF patterns continue developing.

**Top of list = Largest remaining potential**
**Bottom of list = Smallest remaining potential**

**Ranking is NOT:**
- Probability of success
- Recommendation to trade
- Confidence level
- Quality metric

**Step 3: Select a Discovery**

Click any discovery card. The interface will:
1. Split screen vertically (50/50)
2. Show discovery list on top half
3. Show detailed card on bottom half
4. Highlight selected card

**[Screenshot Placeholder: Market Outlook Split View]**
*Caption: Market Outlook with split view showing list above and detail panel below*

**Step 4: Read the Discovery Card**

We'll cover detailed interpretation in the next section, but initially note:
- Trading pair and current price
- When discovered (time ago)
- Risk profile (Conservative/Moderate/Aggressive)
- Target levels (T1, T2, T3)
- Risk zone level
- Progress bars and status

**Step 5: Ask Critical Questions**

Before any analysis, ask yourself:

1. **Do I know this asset?**
   - Fundamentals? Use case? Team? Tokenomics?
   - If no, research first

2. **Is this liquid enough for my size?**
   - Check exchange order book depth
   - Consider your typical position size
   - Evaluate spread costs

3. **Does this align with my strategy?**
   - Timeframe match?
   - Setup type match?
   - Risk parameters compatible?

4. **What's the broader context?**
   - Recent news or developments?
   - Macro environment?
   - Sector performance?

**If you can't confidently answer these questions, this discovery requires more research before any consideration of action.**

### Navigation Tips

**Keyboard Shortcuts:**

- \`Esc\` - Close modals or detail panels
- \`Left/Right Arrows\` - Navigate between discoveries (in detail view)
- \`Space\` - Pause/Resume auto-update
- \`R\` - Manual refresh

**Mouse/Touch:**

- Click card - Open detail view
- Click outside - Close detail view
- Hover card - See quick preview
- Drag scroll - Navigate lists

**Mobile Gestures:**

- Tap card - Open detail
- Tap outside - Close detail
- Swipe left/right - Next/previous discovery (in detail)
- Pull down - Refresh

### Common First-Time Mistakes

**Mistake 1: Information Overload**
- **Problem:** Trying to monitor too many assets
- **Solution:** Start with 5-10 assets you know well

**Mistake 2: Treating Rankings as Recommendations**
- **Problem:** Trading highest-ranked discoveries blindly
- **Solution:** Rankings show magnitude, not quality. Analyze independently.

**Mistake 3: Ignoring Risk Profiles**
- **Problem:** Using aggressive profile for day trading
- **Solution:** Match profile to your analysis timeframe

**Mistake 4: No Written Plan**
- **Problem:** Making decisions ad-hoc based on discoveries
- **Solution:** Define YOUR criteria before seeing discoveries

**Mistake 5: Over-Monitoring**
- **Problem:** Checking every minute, obsessing over updates
- **Solution:** Set specific times to review. Use Paused mode.

### Building Your Analytical Routine

**Daily Review (5-10 minutes):**
1. Check Market Outlook for new high-ranked discoveries
2. Review existing positions for risk alert emergence
3. Note any patterns requiring deeper analysis
4. Add flagged opportunities to research queue

**Deep Analysis (30-60 minutes per opportunity):**
1. Discovery pattern review (what did Kairos detect?)
2. Fundamental research (project quality, developments)
3. Technical analysis (your own indicators and patterns)
4. Macro context (overall market, sector trends)
5. Risk assessment (position sizing, stops, scenarios)
6. Decision documentation (why yes or no)

**Weekly Performance Review:**
1. How did discoveries perform that you analyzed?
2. How did your trades perform vs discovery timing?
3. What patterns worked in current regime?
4. What needed improvement in your process?
5. Any strategy adjustments needed?

### Next Steps

Now that you understand the basics:

1. **Explore the interface** - Click around, open discoveries, get comfortable
2. **Read relevant handbook sections** - Focus on areas matching your trading style
3. **Paper trade first** - Track discoveries without real money
4. **Start small** - When ready for real trading, use tiny position sizes
5. **Build gradually** - Increase complexity and size only with experience

**Remember:** Kairos is sophisticated. Take time to understand it fully before risking significant capital.

**[Screenshot Placeholder: Handbook Navigation Menu]**
*Caption: Handbook table of contents showing sections for deeper learning*

---

## Understanding the Interface

### Market Outlook View

The Market Outlook view provides a high-level overview of current opportunities and risks across your selected assets. This is typically your starting point for daily analysis.

**[Screenshot Placeholder: Full Market Outlook View]**
*Caption: Complete Market Outlook interface showing both Upside Potential and Downside Alert columns*

#### Layout Structure

**Split Column Design:**

**Left Column: Upside Potential**
- Green accent theming
- Discoveries suggesting possible upward movement
- Ranked by remaining distance to T1 (first target)
- Shows only discoveries that haven't hit T1 yet

**Right Column: Downside Alert**
- Orange/yellow accent theming
- Discoveries suggesting possible downward movement
- Ranked by remaining distance to R1 (first risk level)
- Shows only discoveries that haven't hit R1 yet

**Both columns scroll independently, allowing you to review each side separately.**

#### Market Outlook Card Components

Each card in Market Outlook shows condensed information for quick scanning:

**[Screenshot Placeholder: Single Market Outlook Card Annotated]**
*Caption: Market Outlook card with numbered callouts for each element*

**1. Rank Number**
- Large number showing position in ranked list
- #1 = Highest remaining potential
- Changes as patterns progress
- Gray styling (neutral, not directional)

**2. Asset Icons**
- Base asset icon (larger, left)
- Quote asset icon (smaller, right, slightly overlapped)
- Fallback to letter abbreviation if icon missing
- Hover to see asset names

**3. Trading Pair**
- Bold, monospace font
- Example: "BTC/USDT", "ETH/BTC"
- Base/Quote format
- Clickable to open detail

**4. Asset Names**
- Base asset in accent color (cyan for upside, orange for downside)
- Quote asset in muted gray
- Full names when available

**5. Current Price**
- Small, muted text
- Real-time market price
- Formatted for readability (scientific notation handled)
- Reference point for progress

**6. Potential Percentage**
- Large, bold number
- Shows remaining % to first target
- Positive for upside (green)
- Negative for downside (orange)
- "IF pattern continues" context

**7. Potential Label**
- "Upside" or "Downside"
- Clarifies direction
- Small, uppercase text

#### Interacting with Market Outlook

**Clicking a Card:**

When you click any discovery card:
1. View transitions to split-screen mode
2. Discovery list moves to top 50% of screen
3. Detail panel opens in bottom 50%
4. Selected card highlights with cyan border
5. Smooth animation transition

**[Screenshot Placeholder: Split View Transition]**
*Caption: Before and after clicking a card, showing transition to split view*

**Navigating in Split View:**

- **Arrow Keys**: Navigate between discoveries
  - Right Arrow: Next discovery
  - Left Arrow: Previous discovery
  - Wraps to next/previous section if at boundary

- **Esc Key**: Close detail panel, return to full list view

- **Close Button**: X button in detail panel header

**Filtering While in Market Outlook:**

Changes to filters (base assets, denominator, risk profiles) update Market Outlook in real-time:
- New discoveries appear if they meet criteria
- Existing discoveries disappear if they no longer match
- Rankings re-sort based on new calculations
- Smooth fade transitions for updates

#### Understanding the Rankings

**What "Remaining to Target 1" Means:**

The ranking calculation:
\`\`\`
Current Price: $100
Target 1: $110
Remaining = ((110 - 100) / 100) * 100 = +10%

If price moves to $105:
Remaining = ((110 - 105) / 105) * 100 = +4.76%
\`\`\`

Discovery with +10% ranks higher than discovery with +4.76% (more room to run).

**What Rankings Tell You:**
- Which patterns have largest potential magnitude remaining
- Relative ordering within your filtered universe
- Distance to first validation point (T1/R1)

**What Rankings DON'T Tell You:**
- Probability of reaching target
- Quality or reliability of pattern
- Whether you should trade it
- Timing or urgency

**Rankings are analytical context, not actionable recommendations.**

#### Market Outlook Best Practices

**Use Market Outlook For:**
- Daily market scan (5-10 minutes)
- Identifying candidates for deeper research
- Getting big-picture view of market
- Spotting clustering patterns (many similar discoveries)
- Confirming assets on your existing watchlist

**Don't Use Market Outlook For:**
- Immediate trading decisions
- Sole basis for entries
- Confidence or probability assessment
- Replacement for comprehensive analysis

**Effective Workflow:**
1. Open Market Outlook each session
2. Scan both columns for high-ranked discoveries
3. Note assets appearing in both columns (range trading potential)
4. Flag 3-5 discoveries for deep analysis
5. Switch to Opportunities/Risk Alerts for detailed review
6. Conduct independent research on flagged items
7. Make trading decisions based on complete analysis

#### Common Questions About Market Outlook

**Q: Why did a discovery disappear from Market Outlook?**

Discoveries leave Market Outlook when:
- First target hit (moves to Opportunities/Risk Alerts detailed view)
- Pattern invalidated (risk zone touched)
- No longer meets filter criteria (you changed filters)
- Asset delisted or data unavailable

**Q: Why did rankings change even though I didn't trade?**

Rankings change because:
- Market price moved (changes "remaining" calculation)
- Other discoveries progressed differently
- New discoveries appeared
- Existing discoveries hit targets and left the view

Rankings are dynamic and update continuously.

**Q: Should I trade the #1 ranked discovery?**

No. Ranking shows magnitude potential, not quality, probability, or recommendation. Analyze independently.

**Q: Can I see more than what's shown?**

Market Outlook shows discoveries that haven't hit T1/R1 yet. For complete history including resolved discoveries, use Opportunities or Risk Alerts views with pagination.

**[Screenshot Placeholder: Market Outlook Empty State]**
*Caption: Empty state showing "No discoveries match your current filters" with suggestions*

---

### Opportunities View

The Opportunities view shows detailed information about all upside discoveries, including those that have progressed past first target or completed entirely.

**[Screenshot Placeholder: Opportunities View Full Page]**
*Caption: Opportunities view with multiple discovery cards in vertical list*

#### Layout and Structure

**Vertical Scrolling List:**
- Each discovery shown as full detailed card
- Cards stacked vertically with spacing
- Smooth scroll with momentum
- Intersection observer for performance (cards render as they enter view)

**Pagination Controls (Bottom):**
- Per-page selector (10, 25, 50, 100 items)
- Sort order toggle (Ascending/Descending by discovery time)
- First/Previous/Next/Last page buttons
- Page number buttons for direct navigation
- Shows current page and total pages

**[Screenshot Placeholder: Pagination Controls]**
*Caption: Bottom pagination bar with all controls highlighted*

#### Opportunity Card Anatomy

Each opportunity card contains comprehensive information. Let's examine each component in detail.

**[Screenshot Placeholder: Full Opportunity Card Annotated with Numbers]**
*Caption: Complete opportunity card with numbered callouts (1-20) for each element*

**Left Column: Market Information and Entry Details**

**1. Asset Icons and Names**
- **Coins Display**:
  - Base asset icon (larger, z-index higher)
  - Quote asset icon (smaller, overlapped, slightly transparent)
  - Hover effect scales icon slightly
  - Fallback to letter abbreviations if icons fail

- **Trading Pair**:
  - Large, bold, monospace font
  - Example: "ATOM/USDT"
  - Primary identification

- **Asset Names**:
  - Base asset in cyan (accent color)
  - "/" separator in gray
  - Quote asset in muted gray
  - Full names (not just symbols)

- **Current Price**:
  - Small, muted text below names
  - Prefixed with "$" for quote assets that are stablecoins
  - Real-time updated
  - Scientific notation handled with custom formatter

**[Screenshot Placeholder: Close-up of Asset Icons and Names Section]**
*Caption: Detailed view of the market info section showing icon overlap and styling*

**2. Entry Section**

- **Entry Label**: "ENTRY" in small, uppercase, gray text
- **Entry Price**: Large, bold number
  - Price at moment of discovery detection
  - NOT a recommendation to enter at this price
  - Reference point for measuring progression
  - Formatted with custom number formatter

- **Time Section**:
  - "DISCOVERED AT" label
  - **Relative Time**: Green/cyan colored, prominent (e.g., "2h 34m ago")
  - **Absolute Time**: Gray, smaller (e.g., "Jan 15 14:23")
  - Updates in real-time (relative time recalculates)

**3. Term Badge**

- Pill-shaped badge showing risk profile
- "Conservative", "Moderate", or "Aggressive"
- Monospace font, uppercase
- Neutral background (not directionally colored)
- Indicates model parameters used

**4. Risk Zone Display**

- **Label**: "Risk Zone" in uppercase
- **Status Indicator**:
  - Green dot: Untouched (pattern hasn't reached risk zone)
  - Gray dot: Touched (price reached risk zone at some point)
  - Dot has subtle glow effect
  
- **Risk Zone Price**:
  - Bold, monospace number
  - Formatted for readability
  - This is where model detected elevated risk historically

**Critical Understanding:**
The risk zone is NOT a stop-loss recommendation. It shows where historical similar patterns often invalidated. YOUR stop-loss should be determined by YOUR risk management rules, considering:
- Position size and portfolio risk tolerance
- Technical structure (support levels, volume nodes)
- Volatility and typical price action
- Emotional capacity for drawdown

**[Screenshot Placeholder: Risk Zone Component Close-up]**
*Caption: Risk zone section showing status indicator and price*

**Center Divider**

**5. Vertical Divider Line**

- Thin gradient line from top to bottom
- Fades at ends (transparent → accent color → transparent)
- Central dot with glow effect
- Visual separation between left and right columns
- Creates balanced, professional aesthetic

**Right Column: Targets and Performance**

**6. Targets Grid (T1, T2, T3)**

Three target cards in horizontal grid:

**[Screenshot Placeholder: Targets Grid Layout]**
*Caption: Three target cards (T1, T2, T3) showing hit and unhit states*

**Unhit Target Structure:**

- **Label**: "T1", "T2", or "T3" in uppercase
- **Potential Badge**: "POTENTIAL +X.X%" in cyan
  - Shows percentage gain IF target is reached
  - Calculated from entry price
  - NOT a prediction or guarantee
  
- **Target Price Label**: "Target Price" in small text
- **Target Price**: Actual price level
  - Formatted for readability
  - Reference level from historical pattern behavior

- **Progress Bar Container**:
  - **Gray Shadow**: Shows max historical progress before reversal
  - **Green Fill**: Shows current progress toward target
  - Smooth animated width transitions
  - Shimmer animation on green fill
  - Relative percentage of target reached

**Progress Bar Interpretation:**

\`\`\`
Entry: $100
Target: $120 (+20%)
Current: $110

Current Progress = ((110-100)/(120-100)) * 100 = 50%

If historical max was $115 before reversal:
Shadow Progress = ((115-100)/(120-100)) * 100 = 75%

Visual: Green fill at 50%, gray shadow at 75%
\`\`\`

**Meanings:**
- Green > Gray: Current pattern exceeding typical historical behavior (unusual)
- Green ≈ Gray: Current pattern near historical average
- Green < Gray: Current pattern underperforming historical average

**None of these guarantee future behavior. They are context for understanding pattern development relative to history.**

**Hit Target Structure:**

- **Visual Change**:
  - Top border changes to green gradient
  - Background becomes slightly green-tinted
  - "HIT" indicator or green checkmark

- **Gained Badge**: "GAINED X.X%" in green
  - Shows actual gain when target was reached
  - Historical record (doesn't change)
  - Your actual gain likely differs (timing matters)

- **Drawdown Display**: "DD: -X.X%" in gray
  - Maximum adverse move from entry before hitting target
  - Shows "pain" experienced during progression
  - Critical for position sizing analysis

- **Target Price Label**: "Target Price"
- **Target Price**: Historical target level (grayed out)
  - Shows where target was when it hit
  - No longer active tracking

**[Screenshot Placeholder: Hit vs Unhit Target Comparison]**
*Caption: Side-by-side comparison of hit target (green, gained %) vs unhit target (cyan, potential %)*

**7. Performance Metrics Section**

Below targets, two compact metric cards:

**[Screenshot Placeholder: Metrics Section]**
*Caption: Two side-by-side metric cards showing max growth data*

**Card 1: Max Growth Before Risk Zone**

- **Label**: "Max Growth before touching Risk Zone"
- **Growth Value**: 
  - Percentage in green if positive
  - Shows best-case historical outcome without risk zone touch
  - "N/A" if never achieved without risk zone

- **Drawdown Value**:
  - "DD: -X.X%" or "WITH NO DRAW DOWN" if DD was 0%
  - Maximum adverse move during best-case scenario
  - Gray text, secondary info

**Interpretation:**
"Historically, similar patterns reached +X% without touching the risk zone, but experienced up to -Y% drawdown along the way."

**Card 2: Overall Max Growth**

- **Label**: "Overall Max Growth"
- **Growth Value**:
  - Percentage in green if positive
  - Shows absolute best historical outcome
  - Includes patterns that touched risk zone but recovered

- **Drawdown Value**:
  - Maximum adverse move across all historical outcomes
  - Worst-case pain during best-case result

**Interpretation:**
"Historically, the absolute best similar pattern reached +X%, though it experienced up to -Y% drawdown including a risk zone touch."

**Critical Understanding of These Metrics:**

These describe historical MODEL BEHAVIOR, not trading outcomes:

**Why Your Results Will Differ:**
1. **Entry Timing**: You likely didn't enter at discovery price
2. **Exit Timing**: Your exits differ from target tracking
3. **Position Sizing**: Smaller size = better fills, larger size = worse
4. **Emotional Execution**: Perfect execution is rare
5. **Market Conditions**: When YOU trade matters
6. **Costs**: Fees, spread, slippage erode returns
7. **Risk Management**: Your stops may differ from risk zone

**Use These Metrics For:**
- Understanding typical drawdown magnitude (position sizing)
- Setting realistic expectations (don't expect max growth)
- Risk/reward assessment (compare growth to drawdown)
- Pattern behavior context (historical tendencies)

**Don't Use These Metrics For:**
- Expected personal returns (you won't replicate)
- Confidence level (not probability)
- Guarantee of outcome (past ≠ future)
- Sole basis for decisions (insufficient alone)

**[Screenshot Placeholder: Complete Opportunity Card with Real Data]**
*Caption: Full opportunity card showing real example with all elements populated*

#### Card States and Visual Feedback

**Hover State:**
- Subtle elevation (shadow increases)
- Slight upward translation (2px)
- Border color intensifies
- Cursor changes to pointer
- Smooth transition animation

**Loading State:**
- Skeleton placeholder animation
- Gray shimmer effect
- Maintains card dimensions
- Prevents layout shift

**Error State:**
- Red border accent
- Error message in place of content
- Retry button if applicable
- Maintains card structure

**[Screenshot Placeholder: Card States]**
*Caption: Three cards showing normal, hover, and loading states side-by-side*

#### Filtering and Sorting

**Filter Persistence:**

Opportunities view respects header filter selections:
- Base assets
- Quote assets (multiple selection allowed)
- Risk profiles
- Automatically updates when filters change

**Sort Options:**

**By Time (Default):**
- **Descending**: Newest discoveries first (default)
- **Ascending**: Oldest discoveries first

Toggle using sort button in footer controls.

**Why Time-Based Sorting:**
- Most recent discoveries may be most relevant
- Oldest discoveries show long-term patterns
- Time decay consideration (older = potentially less relevant)

**Future Sorting Options:**
- By progress percentage
- By remaining potential
- By risk zone proximity
- By historical hit rate

**Per-Page Selection:**

Choose how many cards display per page:
- 10: Quick scanning, frequent pagination
- 25: Balanced (default)
- 50: More context, less pagination
- 100: Maximum context, potential performance impact

**Consider:**
- Screen size and resolution
- Analysis depth per session
- Performance (more cards = more rendering)
- Scrolling preference

#### Using Opportunities View Effectively

**Daily Scan Workflow:**

1. **Quick Scan (2-3 minutes)**:
   - Scroll through first page
   - Note any new discoveries (recent times)
   - Check hit targets (green badges)
   - Flag interesting patterns for analysis

2. **Progress Check (5 minutes)**:
   - Review existing positions
   - Check progress bars (how far developed?)
   - Monitor risk zone status
   - Note any targets hit overnight

3. **Deep Analysis (30+ minutes)**:
   - Select 2-3 flagged discoveries
   - Conduct comprehensive research
   - Validate with independent analysis
   - Make informed decisions

**Research Workflow:**

For each interesting discovery:

1. **Pattern Context**:
   - When discovered (time decay relevant?)
   - Risk profile (matches your timeframe?)
   - Current progress (early or late in development?)
   - Risk zone status (how much room to risk zone?)

2. **Historical Context**:
   - Max growth and drawdown (realistic expectations)
   - Target hit history (T1/T2/T3 typical outcomes)
   - Time to resolution (how long do patterns take?)
   - Risk zone behavior (recoveries common?)

3. **Independent Analysis**:
   - Fundamental research (project quality, developments)
   - Technical analysis (YOUR indicators and patterns)
   - Macro context (overall market sentiment)
   - Liquidity assessment (can you execute your size?)

4. **Risk Assessment**:
   - Position sizing (based on drawdown tolerance)
   - Stop-loss placement (YOUR criteria, not just risk zone)
   - Exit strategy (YOUR profit-taking rules)
   - Scenario analysis (what if pattern fails?)

5. **Decision Documentation**:
   - Why yes or no?
   - Entry criteria if yes
   - Exit criteria (both profit and loss)
   - Position size and risk budget
   - Review date

**Monitoring Workflow:**

For active positions based on discoveries:

1. **Daily Check**:
   - Current progress vs entry
   - Progress bar development
   - Risk zone proximity
   - Any target hits

2. **Weekly Review**:
   - Is pattern developing as expected?
   - Does thesis still hold?
   - Any fundamental changes?
   - Position adjustment needed?

3. **Performance Tracking**:
   - Your entry vs discovery entry
   - Your current P&L vs discovery progress
   - What would different timing have yielded?
   - Learning for future decisions

#### Common Opportunities View Questions

**Q: Why do some cards show "N/A" for metrics?**

"N/A" appears when:
- Insufficient historical data (new asset, limited history)
- Metric not applicable (e.g., max growth before risk zone if all historical patterns touched it)
- Data unavailable due to technical issue
- Pattern too recent to have complete stats

**Q: Can I hide completed discoveries (all targets hit)?**

Currently, pagination shows all discoveries matching filters. Future versions may include status filters (active, completed, invalidated).

**Q: Why did my entry perform worse than the discovery shows?**

Many reasons:
- You entered after discovery (later price)
- Slippage on your order (market impact)
- Fees and spread costs
- Different position size affects execution
- Emotional exit before targets
- Stop-loss placement differences

This is normal and expected. Discovery metrics are references, not personal performance predictions.

**Q: How do I find discoveries on a specific asset?**

Use base asset filter in header to narrow to specific assets. Future versions may include text search.

**Q: Should I enter near target prices (at T1, T2, T3)?**

No. Targets are resistance levels from historical behavior. Buying INTO resistance is generally poor risk/reward. If entering based on discovery:
- Consider entry closer to discovery price (if pattern hasn't progressed far)
- Wait for target hit and confirm pullback (lower risk)
- Validate with YOUR technical analysis (don't just use discovery levels)

Targets are not entry recommendations.

---

### Risk Alerts View

The Risk Alerts view shows detailed downside discoveries - patterns where models detected potential downward movement or elevated risk.

**[Screenshot Placeholder: Risk Alerts View Full Page]**
*Caption: Risk Alerts view showing multiple risk alert cards with orange/yellow theming*

#### Structural Differences from Opportunities

Risk Alerts use identical card structure to Opportunities, but with inverted context:

**Visual Theming:**
- Orange/yellow accent colors (vs green/cyan for opportunities)
- Warning-style indicators
- "Alert" language instead of "Opportunity"

**Terminology Changes:**

| Opportunities | Risk Alerts |
|--------------|-------------|
| Entry | Alert Trigger Price |
| Discovered At | Alert Triggered |
| Targets (T1, T2, T3) | Risk Levels (R1, R2, R3) |
| Potential +X% | Potential -X% |
| Risk Zone | Recovery Zone |
| Max Growth | Max Decline / Max Loss |
| Draw Down | Peak Retracement |
| Gained X% | Saved X% (if avoided) |

**[Screenshot Placeholder: Risk Alert Card Annotated]**
*Caption: Complete risk alert card with callouts showing equivalent elements to opportunity card*

#### Understanding Risk Alert Components

**Alert Trigger Price:**
- Price when downside pattern was detected
- NOT a recommendation to sell/short at this price
- Reference point for measuring downside progression

**Risk Levels (R1, R2, R3):**
- Support levels or downside objectives from historical patterns
- Where similar downside patterns historically found support or continued declining
- NOT price predictions or short targets
- Context for understanding potential downside magnitude

**Recovery Zone:**
- Price level where historical similar downside patterns often reversed
- Equivalent to risk zone in opportunities (but upside from alert)
- NOT a guarantee of reversal
- NOT a recommendation to enter long positions

**Peak Retracement (PR):**
- Maximum UPWARD movement from alert before downside resumed
- Opposite of drawdown
- Shows "false hope" or bounces during declines
- Critical for understanding typical counter-trend moves

**Example:**
\`\`\`
Alert Trigger: $100
Risk Level 1: $90 (-10%)
Current: $95

During decline to $95, price briefly rallied to $102 (+2%)
Peak Retracement: +2%

Then continued to $95 and possibly lower.
\`\`\`

**Interpretation:**
"Even during downside patterns, expect bounces. Don't assume the first rally means the pattern failed."

#### Using Risk Alerts

**Primary Use Cases:**

**1. Risk Management for Existing Long Positions**

If you hold a long position and a risk alert emerges:

**Assessment Questions:**
- Does this threaten my investment thesis timeframe?
- How significant is the potential downside magnitude?
- What's the historical peak retracement (potential for bounces)?
- Does fundamental analysis support the downside concern?

**Possible Actions:**
- **No Action**: Alert is short-term, thesis is long-term
- **Reduce Position**: Partial de-risking based on concern level
- **Full Exit**: Fundamental thesis deteriorating, pattern confirms
- **Hedge**: Options or inverse positions to protect
- **Tighten Stop**: Adjust stop-loss closer to manage risk

**Critical**: Risk alerts are ONE input. Don't automatically exit on alerts alone. Assess comprehensively.

**2. Identifying Short Opportunities (Advanced)**

Sophisticated traders might consider short positions:

**Additional Required Analysis:**
- **Funding Rates**: Shorts cost money if funding positive
- **Borrow Availability**: Can you borrow the asset?
- **Liquidity**: Deep enough for covering short later?
- **Fundamental**: Deterioration confirms technical?
- **Macro Context**: Broad market supporting downside?
- **Risk Management**: Where's your stop on the short?

**Shorting is inherently higher risk than going long:**
- Unlimited loss potential (price can rise infinitely)
- Funding costs erode returns
- Short squeezes can cause explosive moves against you
- Borrow availability can change (forced cover)

**Never short based solely on risk alerts. Comprehensive analysis is critical.**

**3. Portfolio Rebalancing Signals**

Risk alerts on multiple portfolio holdings:

**Clustering Analysis:**
- **Systematic Risk**: Many alerts = broad market risk (consider overall exposure reduction)
- **Idiosyncratic Risk**: Single asset alert = individual assessment
- **Correlation Shifts**: Normally uncorrelated assets showing alerts = regime change?

**Rebalancing Considerations:**
- Investment policy guidelines (rebalancing thresholds)
- Tax implications of selling
- Transaction costs
- Long-term thesis vs short-term technicals

**4. DCA and Accumulation Strategy Adjustment**

If practicing dollar-cost averaging:

**Strategic Adjustments:**
- **Pause DCA**: If aggressive downside alert emerges, consider pausing accumulation temporarily
- **Reduce Allocation**: Lower percentage to affected asset temporarily
- **Contrarian Opportunity**: If alert hits R1/R2 plus fundamental validation, might be accumulation zone

**Critical**: DCA's power is discipline. Don't let risk alerts destroy systematic approach. Use sparingly for tactical adjustments.

**5. Hedge Timing Context**

Risk alerts can inform hedge decisions:

**Hedge Assessment:**
- **Cost/Benefit**: Alert magnitude vs hedge cost
- **Timeframe**: Alert term vs hedge duration
- **Hedge Ratio**: Full or partial protection?
- **Instrument**: Options, inverse positions, or correlated assets?

**Exit Criteria for Hedges:**
- Recovery zone touch (pattern potentially invalidating)
- Conservative upside discovery emerges (regime shift)
- Fundamental concern resolves
- Hedge cost exceeds benefit

#### Risk Alert Card Details

**Saved Percentage (Hit Risk Levels):**

When a risk level hits, the card shows:
- "SAVED X.X%" badge in orange/yellow
- Indicates how much loss was avoided IF you exited at alert trigger
- Your actual outcome depends on YOUR exit timing

**Example:**
\`\`\`
Alert Trigger: $100
You hold from $110 (before alert)
R1 hits at $90 (-10% from trigger, -18% from your entry)

Card shows: "SAVED 10.0%" (from trigger)
Your outcome: -18% if you held, OR whatever you actually did
\`\`\`

**Peak Retracement Display:**

Similar to drawdown in opportunities:
- "PR: +X.X%" in gray
- Shows maximum bounce before downside continued
- Context for understanding pattern behavior
- Critical for setting realistic expectations

**Recovery Zone Status:**

- **Green Dot**: Untouched (price hasn't rallied to recovery zone)
- **Gray Dot**: Touched (price reached recovery zone)

**If touched:**
- Pattern may be invalidating (downside failing)
- Or temporary bounce before continuation
- Requires reassessment with independent analysis

**Progress Bars for Risk Levels:**

Same structure as opportunity targets, but inverted:
- **Orange/Yellow Fill**: Current downside progress
- **Gray Shadow**: Maximum historical downside before bounce

**Visual representation of how far the downside pattern has developed.**

**[Screenshot Placeholder: Risk Level Progress Bars]**
*Caption: Risk level cards showing unhit (potential) and hit (saved) states with progress bars*

#### Advanced Risk Alert Analysis

**Cross-Referencing with Opportunities:**

**Same Asset, Opposing Discoveries:**

If both aggressive upside AND aggressive downside appear on same asset:

**Possible Interpretations:**
- **Range-bound**: Asset consolidating between levels
- **High Volatility**: Uncertain direction, whipsaw risk
- **Regime Transition**: Market indecision, wait for resolution

**Analytical Approach:**
- Identify potential range boundaries (upside potential to downside risk level)
- Assess order book depth at those levels
- Consider range-trading strategies (grids, mean reversion)
- Monitor for breakout (clustering in one direction)

**Multiple Risk Profiles:**

**Aggressive Downside + Conservative Upside:**

**Possible Interpretation:**
- Aggressive decline happening
- But short-term bounces forming (conservative upside)
- Potential correction or bottom-fishing opportunity

**Validation Required:**
- Volume declining on downside? (exhaustion)
- Divergence on RSI or momentum? (oversold)
- Fundamentals intact despite drop? (technical correction)
- Sentiment extremely bearish? (capitulation)

**If validated, might indicate:**
- Counter-trend bounce opportunity (high risk)
- Accumulation zone for long-term holders
- Short-covering rally potential

**If NOT validated:**
- Falling knife (avoid catching)
- Fundamental deterioration continuing
- Brief bounce before further decline

**Conservative Downside + Aggressive Upside:**

**Possible Interpretation:**
- Strong upward move (aggressive upside)
- But short-term weakness emerging (conservative downside)
- Potential consolidation or pullback before continuation

**Validation Required:**
- Volume declining on rally? (exhaustion)
- Momentum divergence? (overbought)
- Fundamental catalyst spent? (news fully priced)
- Sentiment euphoric? (excess optimism)

**If validated, might indicate:**
- Healthy pullback in uptrend (buying opportunity)
- Consolidation before continuation
- Profit-taking area

**If NOT validated:**
- Trend continuation (upside resumes)
- Pullback less severe than expected
- Strong momentum carrying through

**Clustering Patterns:**

**Many Assets Show Risk Alerts:**

**Systematic Risk Indicators:**
- Multiple unrelated assets flagging simultaneously
- Suggests market-wide pressure
- Potential regime change or macro event

**Response Considerations:**
- Reduce overall portfolio exposure
- Increase cash allocation
- Hedge at portfolio level
- Review all holdings for fundamental deterioration

**Single Asset Risk Alert:**

**Idiosyncratic Risk Indicators:**
- Only one or few related assets flagging
- Suggests asset-specific issues
- Individual assessment required

**Response Considerations:**
- Deep dive on specific asset fundamentals
- Check for news or developments
- Assess whether to hold, reduce, or exit
- Don't assume broader market issue

#### Risk Alert Best Practices

**Do:**
- Use risk alerts as early warning system
- Assess each alert with independent analysis
- Consider alerts ONE input among many
- Monitor existing positions for alert emergence
- Review historical peak retracement to set realistic expectations
- Document decisions (why you acted or didn't)

**Don't:**
- Automatically sell/short on every risk alert
- Ignore fundamental analysis
- Panic and exit all positions indiscriminately
- Use recovery zones as automatic entry points
- Assume alerts are guarantees of downside
- Forget that markets can remain irrational

**Risk Management Integration:**

Risk alerts should integrate into your existing risk framework:

1. **Position Limits**: Alert emergence doesn't override position size rules
2. **Stop-Loss Discipline**: Alerts inform but don't replace your stops
3. **Diversification**: Alerts help identify concentration risk
4. **Hedging Policy**: Alerts trigger hedge review per your policy
5. **Rebalancing Rules**: Alerts are signals to review, not automatic rebalancing triggers

**Backtesting Risk Alerts:**

If researching strategy development:
- Export historical risk alert data
- Analyze how your portfolio would have responded
- Measure correlation between alerts and actual drawdowns
- Test different response protocols
- Validate assumptions with out-of-sample data

**Remember: Backtesting creates hindsight bias. Use results cautiously.**

#### Common Risk Alert Questions

**Q: Should I sell immediately when a risk alert appears?**

No. Risk alerts show pattern detection, not certainty of decline. Assess:
- Your investment timeframe vs alert timeframe
- Fundamental thesis still intact?
- Alert magnitude vs your risk tolerance
- Comprehensive independent analysis

Make decisions based on complete assessment, not alerts alone.

**Q: Why do some risk alerts not decline much?**

Patterns don't always play out. Risk alerts show statistical patterns that CAN fail:
- Market conditions change
- New information emerges
- Pattern invalidates early
- Recovery occurs faster than typical

Failure is normal and expected. This is why risk management and position sizing matter.

**Q: Can I short based on aggressive downside alerts?**

You can, but with extreme caution:
- Shorting has unlimited loss potential
- Funding costs on perpetuals
- Short squeezes are violent
- Requires independent comprehensive analysis
- Never short on alerts alone

Most traders should avoid shorting. If you do short, size very conservatively.

**Q: How do I know if a risk alert is serious?**

Severity assessment factors:
- **Risk Profile**: Aggressive alerts suggest larger magnitude patterns
- **Clustering**: Multiple assets or multiple profiles flagging (systematic risk)
- **Fundamental Confirmation**: News or developments supporting downside
- **Historical Context**: Recent market regime and typical behavior
- **Technical Confirmation**: Your own indicators agreeing

No single factor determines severity. Comprehensive assessment required.

**Q: What if risk alert emerges on my largest position?**

Don't panic. Assess systematically:
1. Review your original investment thesis
2. Check for fundamental changes
3. Analyze alert magnitude and timeframe
4. Compare to your risk tolerance
5. Consider partial vs full de-risking
6. Document decision rationale

Your response depends on YOUR situation, not the alert alone.

**[Screenshot Placeholder: Risk Alert Card with Real Example]**
*Caption: Complete risk alert card showing real downside pattern with all metrics*

---

### Filters and Controls Deep Dive

Understanding filters and controls is essential for configuring Kairos to match your analysis needs and workflow.

**[Screenshot Placeholder: Header with All Filters Visible]**
*Caption: Complete header section showing all filter components and controls*

#### Model Selection

**Hunter S1 Selector:**

Currently, only Hunter S1 is available. This dropdown is preparation for Hunter S2 launch.

**[Screenshot Placeholder: Model Selector Dropdown]**
*Caption: Model selector showing Hunter S1 selected and S2 "Coming Soon"*

**Hunter S1 Characteristics:**
- Static references from discovery moment
- Transparent performance tracking
- No post-detection adjustments
- Complete accountability

**Hunter S2 (Coming Soon):**
- Dynamic reference updates
- Continuous pattern re-evaluation
- Adaptive to regime changes
- More complex performance attribution

**When S2 launches, you'll be able to:**
- Select which model to view
- Compare S1 vs S2 discoveries
- Understand different approach tradeoffs

#### Base Assets Filter

**Purpose:**
Select which cryptocurrencies you want to monitor for pattern discoveries.

**[Screenshot Placeholder: Base Assets Selector Open]**
*Caption: Base asset selector modal showing search, asset list, and selection states*

**Opening the Selector:**
1. Click "Base Assets" filter group in header
2. Or click edit button (pencil icon) next to asset preview
3. Modal opens with slide-in animation

**Interface Components:**

**Search Bar:**
- Type asset name or symbol
- Real-time filtering as you type
- Case-insensitive matching
- Searches both name and symbol

**Asset List:**
- Scrollable list of all available assets
- Alphabetically sorted by default
- Selected assets appear at top of list
- Unselected assets below

**Each Asset Item Shows:**
- Asset icon (or letter fallback)
- Asset full name
- Asset symbol (in gray, smaller)
- Selection action button:
  - "+" for unselected assets
  - "✓" for selected assets

**Interaction:**
- Click any asset to toggle selection
- Selected assets highlight with cyan background
- Selection count updates in preview
- Changes apply immediately (real-time filtering)

**Asset Preview (in Header):**
- Shows icons of first N selected assets
- "+X" badge if more selected than visible
- Hover individual icons to see asset name
- Responsive sizing (more space = more icons shown)

**Selection Strategies:**

**Focused Approach (Recommended for Most Users):**
- Select 5-10 assets you know well
- Assets you actively trade or invest in
- Assets with sufficient liquidity for your size
- Assets where you understand fundamentals

**Benefits:**
- Manageable number of discoveries
- Deeper analysis per asset
- Better understanding of each asset
- Less overwhelming

**Broad Approach (Advanced Users):**
- Select many assets (20-50+)
- Screening for opportunities across market
- Research-oriented workflow
- Comfortable with high information flow

**Benefits:**
- Wider opportunity net
- Discover overlooked assets
- Market-wide pattern detection
- Comprehensive coverage

**Drawbacks:**
- Information overload risk
- Shallow analysis per asset
- Difficult to know all assets well
- May miss deep insights

**Best Practices:**

**Do:**
- Select assets you can properly research
- Focus on liquid markets
- Know the fundamentals of selected assets
- Adjust selection as your focus changes
- Consider correlation (don't select 10 similar DeFi tokens)

**Don't:**
- Select everything (unfocused approach)
- Select assets you've never heard of
- Ignore liquidity considerations
- Keep stale selections you no longer trade

**Technical Details:**

**Available Assets:**
- All assets with sufficient historical data on Butterfly
- Major cryptocurrencies (BTC, ETH, major alts)
- Many altcoins and newer listings
- Both spot and perpetual markets (where applicable)

**Icon Loading:**
- Icons preloaded into browser cache
- Fallback to letter abbreviations if icon fails
- Graceful degradation for missing assets

**Performance Optimization:**
- Intersection observer for list rendering
- Virtual scrolling for very long lists
- Debounced search (300ms delay)
- Efficient re-render on selection changes

**[Screenshot Placeholder: Asset Search in Action]**
*Caption: Search bar with "BTC" typed, showing filtered results*

#### Quote Assets / Denominator Filter

This filter behaves differently depending on current view:

**In Market Outlook View: Single Denominator Selection**

**[Screenshot Placeholder: Denominator Selector]**
*Caption: Single-select denominator picker showing USDT, BTC, ETH options*

**Purpose:**
Choose the currency against which performance is measured in Market Outlook rankings.

**Label Changes:**
- Filter label changes from "Quote Assets" to "Denominator"
- Indicates single-selection mode
- Preview shows only one asset

**Options:**
- USDT (most common - USD-denominated returns)
- BTC (Bitcoin-denominated returns)
- ETH (Ethereum-denominated returns)
- Other major stablecoins (USDC, BUSD, etc.)

**Selection Behavior:**
- Click an asset to select it exclusively
- Previous selection automatically deselected
- Changes apply immediately
- Rankings recalculate for new denominator

**Use Cases by Denominator:**

**USDT Denominator:**
- **For**: Traders/investors focused on USD gains
- **Shows**: Which assets outperform in USD terms
- **Best for**: Fiat on/off ramp strategies, USD-pegged portfolios

**BTC Denominator:**
- **For**: Bitcoin holders wanting to outperform BTC
- **Shows**: Which assets are gaining vs Bitcoin
- **Best for**: Bitcoin-based portfolios, altcoin rotation strategies

**ETH Denominator:**
- **For**: Ethereum holders or DeFi-heavy portfolios
- **Shows**: Which assets are gaining vs Ethereum
- **Best for**: Ethereum-centric strategies, Layer-2 analysis

**Example of Denominator Impact:**

\`\`\`
Asset: ATOM
Price: $10 → $11 (+10% in USD)
BTC Price: $40,000 → $44,000 (+10% in USD)

USDT Denominator: ATOM shows +10% potential
BTC Denominator: ATOM shows ~0% potential (moved same as BTC)

If BTC only moved to $42,000 (+5%):
BTC Denominator: ATOM shows +4.76% potential (outperforming BTC)
\`\`\`

**Switching Denominators:**
- Rankings completely re-sort
- Different assets may appear
- Same assets show different potentials
- Useful for multi-perspective analysis

**In Opportunities / Risk Alerts Views: Multiple Quote Asset Selection**

**[Screenshot Placeholder: Quote Assets Multi-Select]**
*Caption: Multi-select quote asset picker with several assets selected*

**Purpose:**
Filter discoveries to only show those with selected quote assets.

**Label:**
- "Quote Assets" (not "Denominator")
- Indicates multi-selection mode
- Preview shows multiple asset icons

**Selection Behavior:**
- Click assets to toggle selection
- Multiple assets can be selected simultaneously
- Can select all, some, or none
- If none selected, shows all quote assets

**Common Selections:**

**Stablecoin-Only:**
- Select: USDT, USDC, BUSD
- **Shows**: Fiat-denominated opportunities
- **For**: Traders focused on USD gains

**BTC Pairs:**
- Select: BTC only
- **Shows**: Altcoin opportunities vs Bitcoin
- **For**: Bitcoin-relative trading

**Mixed:**
- Select: USDT, BTC, ETH
- **Shows**: Opportunities across major denominators
- **For**: Comprehensive view

**Technical Note:**
In Opportunities/Risk Alerts, the quote asset is part of the trading pair. In Market Outlook, denominator is a calculation perspective (all pairs converted to denominator-relative terms).

#### Risk Profile Selection

**[Screenshot Placeholder: Risk Profile Button Group]**
*Caption: Three-button group showing Conservative, Moderate, Aggressive with multiple selections*

**Purpose:**
Select which model timeframes and parameters to include in discoveries.

**Visual Design:**
- Three-button horizontal group
- Pill-shaped, connected buttons
- Active selections highlighted (green glow)
- Inactive selections muted gray
- Smooth toggle animations
- Can select one, multiple, or all three

**Selection States:**

**Single Selection:**
\`\`\`
[Conservative] [Moderate] [Aggressive]
     ✓
\`\`\`
Shows only conservative discoveries

**Multiple Selection:**
\`\`\`
[Conservative] [Moderate] [Aggressive]
     ✓            ✓
\`\`\`
Shows both conservative and moderate discoveries

**All Selected:**
\`\`\`
[Conservative] [Moderate] [Aggressive]
     ✓            ✓            ✓
\`\`\`
Shows discoveries from all risk profiles

**None Selected:**
- Defaults to showing all profiles
- Equivalent to all selected

**Risk Profile Deep Dive:**

**Conservative:**
- **Timeframe**: Minutes to hours
- **Criteria**: Tighter thresholds, closer levels
- **Discovery Frequency**: High (many patterns detected)
- **Typical Magnitude**: Smaller moves (1-5%)
- **Historical Hit Rate**: Higher (patterns resolve more frequently)
- **Use For**: Day trading, scalping analysis, quick validation

**Moderate:**
- **Timeframe**: Hours to days
- **Criteria**: Balanced thresholds
- **Discovery Frequency**: Medium
- **Typical Magnitude**: Medium moves (3-10%)
- **Historical Hit Rate**: Medium
- **Use For**: Swing trading, multi-day holds

**Aggressive:**
- **Timeframe**: Days to weeks
- **Criteria**: Wider thresholds, distant levels
- **Discovery Frequency**: Lower (fewer patterns meet criteria)
- **Typical Magnitude**: Larger moves (8-25%+)
- **Historical Hit Rate**: Lower (but larger gains when successful)
- **Use For**: Position trading, longer-term analysis

**Critical Understanding:**

Risk profiles describe MODEL PARAMETERS, not:
- Your personal risk tolerance
- Investment suitability recommendations
- Confidence or probability levels
- Guaranteed return expectations

**Selection Strategy:**

**Match to Your Timeframe:**
- Day trading → Conservative (maybe + Moderate)
- Swing trading → Moderate (maybe + Conservative)
- Position trading → Aggressive (maybe + Moderate)
- Multi-timeframe → All three for comprehensive view

**Cross-Profile Analysis (Advanced):**

Selecting multiple profiles enables pattern comparison:

**Convergence Signal:**
\`\`\`
Same asset shows:
- Conservative upside discovery
- Moderate upside discovery  
- Aggressive upside discovery

Interpretation: Pattern detected across timeframes (stronger setup)
Validation: Check if YOUR analysis agrees
\`\`\`

**Divergence Signal:**
\`\`\`
Same asset shows:
- Aggressive upside discovery
- Conservative downside discovery

Interpretation: Long-term upside, short-term pullback
Validation: Trend continuation or reversal?
\`\`\`

**Isolation Signal:**
\`\`\`
Only Aggressive profile shows discovery

Interpretation: Pattern only visible on longer timeframe
Validation: Early trend or false signal?
\`\`\`

**These are analytical contexts, not trading rules. Always validate independently.**

#### Auto-Update Controls

**[Screenshot Placeholder: Auto-Update Toggle and Refresh Button]**
*Caption: Live/Paused toggle button and manual refresh button*

**Live Mode (Default):**

Visual Indicators:
- Green accent on toggle button
- "LIVE" text label
- Play icon visible
- Subtle pulse animation

Behavior:
- Discoveries update every 30 seconds
- New patterns appear automatically
- Existing patterns progress in real-time
- Price updates continuously
- Smooth fade-in animations for changes

Use When:
- Active monitoring session
- Want real-time awareness
- Watching market during volatility
- Multiple screen setup (Kairos on one screen)

**Paused Mode:**

Visual Indicators:
- Gray/muted toggle button
- "PAUSED" text label
- Pause icon visible
- No animations

Behavior:
- No automatic updates
- View frozen at pause moment
- Manual refresh still available
- Filters still apply immediately

Use When:
- Deep analysis without distractions
- Taking screenshots or notes
- Comparing specific discoveries
- Conducting research without interruption
- Need stable view for documentation

**Toggling Between Modes:**
- Click toggle button
- State changes immediately
- Announcement for screen readers
- Preference not persisted (resets to Live on reload)

**Manual Refresh Button:**

Visual Design:
- Circular arrow icon
- Neutral color when idle
- Spins when clicked
- Brief animation (0.6s rotation)

Behavior:
- Forces immediate data fetch
- Works in both Live and Paused modes
- Updates all visible discoveries
- Applies current filter settings
- Shows brief loading state

Use When:
- Just changed filters (instant feedback)
- Want to confirm Live mode is working
- In Paused mode but want to check updates
- Suspected data staleness

**Data Staleness Indicators:**

While not currently implemented, future versions may show:
- "Last updated: 2m ago" timestamp
- Yellow indicator if data > 5 minutes old
- Red indicator if data > 10 minutes old
- Automatic reconnection if connection lost

#### Pagination Controls (Footer)

**[Screenshot Placeholder: Complete Pagination Bar]**
*Caption: Footer controls showing all pagination elements*

**Left Side: Display Controls**

**Per Page Selector:**
- Dropdown menu
- Options: 10, 25, 50, 100
- Default: 25
- Selection persisted in session

Usage:
- 10: Quick scanning, mobile-friendly
- 25: Balanced default
- 50: Desktop analysis, more context
- 100: Maximum density, research mode

Performance Note:
- Higher counts = more rendering
- Slower devices may prefer lower counts
- Intersection observer optimizes loading

**Sort Order Toggle:**

Visual Design:
- Button with up/down arrows icon
- "Asc" or "Desc" text label
- Flip animation on toggle

Behavior:
- **Desc (Default)**: Newest discoveries first
- **Asc**: Oldest discoveries first
- Applies immediately
- Resets to page 1 on toggle

Use Cases:
- Desc: See most recent patterns (default workflow)
- Asc: Historical analysis, long-term pattern tracking

**Right Side: Navigation Controls**

**First Page Button (⟪):**
- Jumps to page 1
- Disabled if already on page 1
- Useful when deep in pagination

**Previous Page Button (‹):**
- Moves back one page
- Disabled on page 1
- Keyboard: Left arrow (when not in detail view)

**Page Numbers:**
- Shows current page and nearby pages
- Direct click to jump to page
- Ellipsis (...) when many pages exist
- Active page highlighted

Page Number Logic:
\`\`\`
On page 1 of 20: [1] 2 3 4 5 ... 20
On page 10 of 20: 1 ... 8 9 [10] 11 12 ... 20
On page 20 of 20: 1 ... 16 17 18 19 [20]
\`\`\`

**Next Page Button (›):**
- Moves forward one page
- Disabled on last page
- Keyboard: Right arrow (when not in detail view)

**Last Page Button (⟫):**
- Jumps to final page
- Disabled if already on last page
- Useful for seeing oldest/least progressed

**Pagination State:**

Display shows:
- Current page number
- Total page count
- Total discoveries matching filters

Example: "Page 3 of 12 (287 opportunities)"

**Navigation Behavior:**

Smooth Transitions:
- Page changes trigger loading state
- Fade out current page
- Fetch new page data
- Fade in new page
- Scroll to top of list

Loading States:
- Skeleton placeholders during fetch
- Prevents layout shift
- ~500ms typical load time
- Error handling if fetch fails

**Keyboard Navigation:**

Within pagination controls:
- Tab: Move between buttons
- Enter/Space: Activate button
- Left/Right: Previous/Next (when focused)

**Mobile Adaptations:**

On mobile devices:
- Smaller button sizes
- Touch-optimized tap targets
- Swipe gestures for next/previous
- Condensed page number display
- Pull-to-refresh support

**[Screenshot Placeholder: Pagination on Mobile]**
*Caption: Mobile view of pagination with touch-optimized buttons*

#### Filter Combination Effects

Understanding how filters interact:

**Additive Filtering:**

Filters combine with AND logic:
\`\`\`
Base Assets: [BTC, ETH, ATOM]
AND
Quote Assets: [USDT, BTC]
AND
Risk Profiles: [Conservative, Moderate]

Result: Discoveries matching ALL criteria
- BTC/USDT, ETH/USDT, ATOM/USDT (pairs with USDT quote)
- BTC/BTC (invalid), ETH/BTC, ATOM/BTC (pairs with BTC quote)
- From Conservative OR Moderate profiles
\`\`\`

**Empty Filters:**

If a filter has no selections:
- Treated as "all" (not "none")
- Doesn't restrict results
- Equivalent to selecting everything

Example:
\`\`\`
Base Assets: [BTC, ETH] (restricted)
Quote Assets: [] (empty = all quotes)
Risk Profiles: [Conservative] (restricted)

Result: BTC and ETH pairs, all quote assets, only Conservative
\`\`\`

**Performance Considerations:**

More Selections = More Results:
- Broader filters = more discoveries
- More discoveries = more cards to render
- Consider performance on slower devices
- Use pagination to manage display

Fewer Selections = Focused Analysis:
- Narrow filters = fewer discoveries
- Easier to analyze deeply
- Less overwhelming
- Better for targeted strategies

**Filter State Persistence:**

Current Session:
- Filter selections maintained while browser tab open
- Survives navigation between views
- Reset if page refreshed (planned: localStorage persistence)

Future Enhancements:
- Save filter presets
- Name and recall configurations
- Share filter links
- Session history

**Real-Time Filter Application:**

All filter changes apply immediately:
1. User changes filter selection
2. Interface debounces input (300ms)
3. API call with new filter parameters
4. Loading state displays
5. Results update with smooth transition
6. Announcement for screen readers

No "Apply" button needed - changes are instant.

---

### Reading Discovery Cards in Detail

This section provides comprehensive guidance on interpreting every element of discovery cards.

#### Visual Design Principles

Kairos cards follow design principles that aid comprehension:

**Information Hierarchy:**
1. **Primary**: Trading pair, current status (hit/unhit)
2. **Secondary**: Prices, targets, metrics
3. **Tertiary**: Labels, timestamps, metadata

**Color Coding:**
- **Cyan/Green**: Positive (gains, upside, growth)
- **Orange/Yellow**: Warning (risk, downside, caution)
- **Gray**: Neutral (labels, metadata, reference)
- **White**: Primary content (text, numbers)

**Typography:**
- **Monospace**: Prices, percentages, data
- **Sans-serif**: Labels, descriptions, UI elements
- **Bold**: Important numbers, emphasis
- **Regular**: Supporting information

**Spacing and Grouping:**
- Related information clustered
- Clear visual separation between sections
- Generous padding for readability
- Card borders for containment

#### Progressive Disclosure

Cards show information at multiple depth levels:

**Glance Level (1 second):**
- Trading pair
- Direction (opportunity vs risk alert)
- Current status (targets hit vs unhit)

**Scan Level (5-10 seconds):**
- Entry price and time
- Target prices and progress
- Risk zone status
- Hit count

**Study Level (30+ seconds):**
- Historical performance metrics
- Drawdown/retracement details
- Progress bar interpretation
- Time-based analysis

**Research Level (5+ minutes):**
- Cross-reference with independent analysis
- Historical pattern behavior assessment
- Risk/reward calculation
- Decision-making integration

#### Interpreting Price Formatting

Kairos uses custom price formatting for readability:

**Standard Decimals:**
\`\`\`
$1234.56 → Typical formatting
$0.1234 → Four decimal places
\`\`\`

**Scientific Notation Handling:**
\`\`\`
0.00001234 → 0.0₄1234
(Shows subscript for leading zeros)

Meaning: 4 leading zeros, then 1234
\`\`\`

**Very Small Numbers:**
\`\`\`
0.000000123456 → 0.0₆1234
(Truncates after subscript for readability)
\`\`\`

**Large Numbers:**
\`\`\`
12345.67 → No special formatting
\`\`\`

**Why This Matters:**

Many altcoins trade at very small prices. Standard notation like "0.00001234" is hard to read quickly. Subscript notation makes it clear at a glance how many leading zeros exist.

**[Screenshot Placeholder: Price Formatting Examples]**
*Caption: Various price formats showing decimal, subscript, and standard notations*

#### Time Display Interpretation

Discoveries show two time formats:

**Relative Time:**
- "Just now" - <60 seconds ago
- "5m ago" - 5 minutes ago
- "2h 15m ago" - 2 hours 15 minutes ago
- "3d ago" - 3 days ago
- "2w ago" - 2 weeks ago
- "3M ago" - 3 months ago
- "1y ago" - 1 year ago

**Absolute Time:**
- "Jan 15 14:23" - Month, day, 24-hour time
- User's local timezone
- Consistent date format

**Time Decay Consideration:**

Pattern relevance may decrease over time:

**Very Recent (<1 hour):**
- Pattern just detected
- Early in development
- Most "fresh" for current market conditions

**Recent (1 hour - 1 day):**
- Pattern partially developed
- Some validation of continuation
- Still relatively fresh

**Older (1 day - 1 week):**
- Pattern has had time to develop or fail
- More historical context available
- Market conditions may have shifted

**Old (>1 week):**
- Pattern is "stale" for short-term trading
- May still be valid for position trading
- Consider whether market regime has changed

**Time decay is NOT automatic invalidation. Long-term patterns can take weeks to resolve. Consider pattern timeframe (risk profile) when assessing staleness.**

#### Target Hit States

Targets transition through states as patterns develop:

**State 1: Unhit (Initial)**

Visual:
- No special highlighting
- Gray/neutral border
- "POTENTIAL +X%" badge
- Empty progress bar

Interpretation:
- Target not yet reached
- Pattern still developing
- Shows what's possible IF pattern continues

**State 2: Progressing**

Visual:
- Progress bar filling (green for opportunities, orange for risks)
- Shadow bar showing historical maximum
- Current price approaching target

Interpretation:
- Pattern developing in expected direction
- Compare current progress to shadow (typical historical)
- No guarantee of target hit

**State 3: Hit**

Visual:
- Green (opportunities) or orange (risk alerts) top border
- Background tint matching direction
- "GAINED X%" or "SAVED X%" badge
- No progress bar (completed)
- Grayed-out target price

Interpretation:
- Target was reached at some point
- Shows actual gain/loss from discovery entry
- Historical record (doesn't change)
- Your outcome depends on YOUR timing

**State 4: Reversed After Progress**

Visual:
- Progress bar shows maximum reached
- Current price pulled back
- Shadow bar shows how far it got
- Target still unhit

Interpretation:
- Pattern developed partially then reversed
- Common behavior (not failure necessarily)
- Pattern may resume or invalidate
- Shadow bar shows "high water mark"

**[Screenshot Placeholder: Target State Progression]**
*Caption: Four-panel sequence showing target moving through states*

#### Progress Bar Deep Dive

Progress bars are sophisticated visualization elements worth understanding fully:

**Components:**

**Track (Background):**
- Light gray container
- Full width of target card
- 4-6px height
- Subtle inner shadow

**Shadow Fill (Historical Maximum):**
- Semi-transparent gray
- Shows historical maximum progress before reversal
- Calculated from historical similar patterns
- Static once discovery created

**Current Fill (Real-Time Progress):**
- Solid color (green for opportunities, orange for risks)
- Shows current progress toward target
- Updates in real-time
- Smooth width transition animation
- Subtle shimmer effect

**Calculation:**

\`\`\`javascript
Entry: $100
Target: $120
Current: $110

Progress = ((Current - Entry) / (Target - Entry)) * 100
Progress = ((110 - 100) / (120 - 100)) * 100
Progress = (10 / 20) * 100 = 50%

If historical similar patterns averaged $115 before reversing:
Shadow = ((115 - 100) / (120 - 100)) * 100 = 75%

Visual: Green bar at 50%, gray shadow at 75%
\`\`\`

**Interpretation Scenarios:**

**Scenario A: Current > Shadow**
\`\`\`
Shadow: 60%
Current: 75%
\`\`\`
**Meaning:**
- Current pattern exceeding typical historical behavior
- Either: Stronger than usual pattern, OR
- Market conditions more favorable, OR
- Historical data not representative

**Action:**
- Reassess: Why outperforming?
- Consider: Partial profit-taking if nearing target?
- Monitor: Sustainability of move
- Validate: With independent analysis

**Scenario B: Current ≈ Shadow**
\`\`\`
Shadow: 65%
Current: 67%
\`\`\`
**Meaning:**
- Current pattern near historical average
- Behaving "typically"
- Nearing historical reversal zone

**Action:**
- Watch carefully: Historical patterns often reversed near shadow
- Consider: Tightening stops if long
- Prepare: For potential reversal or consolidation
- Don't assume: Will continue past shadow

**Scenario C: Current < Shadow**
\`\`\`
Shadow: 80%
Current: 40%
\`\`\`
**Meaning:**
- Current pattern underperforming history
- Either: Weaker market conditions, OR
- Pattern developing more slowly, OR
- Early in progression (hasn't reached historical max yet)

**Action:**
- Assess: Is pattern invalidating or just slow?
- Check: Overall market conditions
- Compare: To your technical analysis
- Patience: If fundamentals intact

**Scenario D: Current Near 100%**
\`\`\`
Shadow: 75%
Current: 95%
\`\`\`
**Meaning:**
- Pattern nearly at target
- Far exceeding historical typical behavior
- High probability of reversal or consolidation

**Action:**
- Strong consider: Profit-taking
- Avoid: Chasing last 5%
- Prepare: For next target or exit
- Celebrate: If you participated

**Critical Understanding:**

Progress bars show statistical context, not predictions:
- Shadow is historical reference, not resistance
- Current fill is observation, not projection
- Neither guarantees future behavior
- Use as context for YOUR decision-making

**[Screenshot Placeholder: Progress Bar Scenarios]**
*Caption: Four progress bars showing different current vs shadow scenarios*

#### Historical Performance Metrics Interpretation

The metrics section provides critical context but requires careful interpretation:

**Metric Cards Structure:**

Two side-by-side cards:
1. Max Growth Before Risk Zone
2. Overall Max Growth

**Why Two Metrics?**

Different scenarios matter differently:

**Before Risk Zone:**
- "Clean" wins without hitting stop
- Lower risk pathway
- What's possible with tight risk management
- Conservative outcome expectation

**Overall:**
- Absolute best case including recoveries
- Higher risk pathway (touched risk zone)
- What's possible with wider stops or averaging
- Aggressive outcome expectation

**Example Analysis:**

\`\`\`
Discovery on ATOM/USDT
Entry: $10

Max Growth Before Risk Zone: +15% (DD: -3%)
Overall Max Growth: +28% (DD: -12%)

Interpretation:
- Historical "safe" wins reached $11.50 with $9.70 worst drawdown
- Historical best overall reached $12.80 but dipped to $8.80 first
- Risk zone was touched in best overall case
- Big difference suggests many patterns hit risk zone
\`\`\`

**Decision Framework:**

**Conservative Approach:**
- Focus on "Before Risk Zone" metrics
- Size position for -3% drawdown tolerance
- Set stops before risk zone
- Accept lower upside for lower risk

**Aggressive Approach:**
- Focus on "Overall" metrics
- Size position for -12% drawdown tolerance
- Give pattern room through risk zone
- Accept higher risk for higher upside potential

**Balanced Approach:**
- Consider both metrics
- Size between the two scenarios
- Set initial stop at risk zone
- Plan for possible recovery or exit

**Critical Questions:**

**Q: Can I expect the max growth performance?**

No. Max growth is the BEST historical outcome. Most patterns perform worse. Average outcomes are typically much lower. Use max growth as ceiling, not expectation.

**Q: How should I use drawdown figures?**

For position sizing. If historical DD is -10%:
- Can you tolerate -10% on this position size?
- Would -10% trigger emotional exit?
- Does your stop loss allow for -10%?
- If using leverage, would -10% liquidate you?

If answers suggest -10% is problematic, reduce position size.

**Q: What if "Before Risk Zone" shows N/A?**

Means all historical similar patterns touched the risk zone before reaching targets. This suggests:
- Pattern is historically volatile
- Risk zone may be too tight
- Patterns often need room to develop
- Higher risk profile overall

Consider:
- Do you have conviction to hold through risk zone?
- Can you tolerate the drawdown?
- Is fundamental thesis strong enough?
- Should you wait for better setup?

**Q: What if metrics show very low numbers?**

\`\`\`
Max Growth Before Risk Zone: +2% (DD: -1%)
Overall Max Growth: +3% (DD: -2%)
\`\`\`

This suggests:
- Historically weak pattern development
- Tight ranges, minimal moves
- Low risk but also low reward
- May not be worth transaction costs

Consider:
- Is risk/reward favorable after costs?
- Why is historical performance modest?
- Is current market different than history?
- Better opportunities elsewhere?

**[Screenshot Placeholder: Metrics Cards Examples]**
*Caption: Various metric card examples showing different performance profiles*

---

## Core Concepts

### The Data-Model-Interface Stack

Understanding how Kairos works from data collection through visualization helps you use it effectively.

#### Layer 1: Butterfly Data Infrastructure

**What Butterfly Provides:**

**Tick-Level Data Collection:**
- Every single trade recorded
- Exact price, volume, timestamp, side (buy/sell)
- Complete order book snapshots at intervals
- Funding rate data for perpetual contracts
- No gaps, no missing data

**Since When:**
- From asset's first listing on exchange
- Complete history (months to years)
- No survivorship bias (includes delisted assets)
- Continuous collection (24/7/365)

**Quality Control Process:**

1. **Real-Time Validation:**
   - Format checking (correct data types)
   - Range validation (prices within reasonable bounds)
   - Continuity checking (no unexpected gaps)
   - Duplicate detection and removal

2. **Cross-Exchange Validation:**
   - Compare against multiple sources when available
   - Flag anomalies (flash crashes, erroneous ticks)
   - Consensus pricing for accuracy

3. **Backfilling:**
   - Detect any gaps in historical data
   - Fetch missing data from exchange archives
   - Verify completeness
   - Never leave holes in dataset

4. **Anomaly Detection:**
   - Statistical outlier identification
   - Manual review of extreme events
   - Correct or flag suspicious data
   - Maintain audit trail

**Storage and Access:**

- High-performance time-series database
- Optimized for temporal queries
- Fast access to historical data
- Low-latency real-time streams
- Redundancy and backup systems

**What This Enables:**

- Microstructure analysis at finest granularity
- Statistical models with complete historical context
- Real-time pattern detection with no delay
- Research-grade data quality
- Confidence in analysis foundation

**What This Doesn't Guarantee:**

- Exchanges sometimes have outages (we record what exists)
- Network issues can cause brief delays (typically <1 second)
- Exchange data quality varies (we validate but can't fix source errors)
- Off-exchange activity not captured (OTC, dark pools)

#### Layer 2: Quant Labs Statistical Models

**Model Philosophy:**

Traditional quantitative finance assumes:
- Markets are efficient
- Returns are normally distributed
- Volatility is predictable
- Relationships are linear

Crypto reality:
- Markets are inefficient (opportunities exist)
- Returns have fat tails (extreme moves common)
- Volatility clusters and regime-shifts
- Relationships are non-linear and dynamic

**Quant Labs' Approach:**

**Non-Parametric Methodology:**
- No assumptions about distributions
- Let data speak for itself
- Empirical pattern library construction
- Adapt to what actually happens

**Microstructure Focus:**
- Analyze order flow dynamics
- Study volume profile patterns
- Examine market profile structure
- Track liquidity changes
- Understand tick-level behavior

**Pattern Detection Process:**

**Step 1: Feature Extraction**

From tick data, calculate features:
- Order flow imbalance (buy vs sell pressure)
- Volume concentration (where volume clusters)
- Trade arrival rate (frequency changes)
- Size distribution (large vs small trades)
- Spread behavior (liquidity quality)
- Price momentum (directional pressure)
- Volatility measures (realized volatility)

**Step 2: Pattern Matching**

Compare current features to historical pattern library:
- Calculate similarity scores
- Statistical distance measures
- Multi-dimensional matching
- Context-aware comparison

**Step 3: Threshold Evaluation**

Determine if similarity exceeds significance thresholds:
- Different thresholds for conservative/moderate/aggressive
- Multiple criteria must be satisfied
- False positive reduction
- Pattern quality filtering

**Step 4: Reference Level Calculation**

If pattern detected, calculate reference levels:
- Entry price (current price at detection)
- Target levels (based on historical similar patterns)
- Risk zone (based on historical invalidations)
- Expected timeframe (based on historical duration)

**Step 5: Discovery Generation**

Create discovery with:
- Trading pair and direction
- Reference prices locked
- Historical context metrics
- Tracking initialization

**What Models Detect:**

- Statistical patterns in order flow
- Volume profile breakouts/breakdowns
- Market structure shifts
- Liquidity vacuum zones
- Microstructure anomalies

**What Models Don't Detect:**

- Fundamental value or fair price
- News impact or sentiment
- Future price movements (detection, not prediction)
- Manipulation or whale intentions
- Off-chain factors

**Model Limitations:**

**Regime Change Vulnerability:**
- Models learn from historical data
- If market structure changes fundamentally, patterns may stop working
- Crypto markets evolve rapidly
- New token mechanics, new trading dynamics
- Past patterns may not repeat

**Overfitting Risk:**
- Complex models can fit noise
- Mitigation: Out-of-sample validation
- Regular model evaluation
- Conservative threshold selection

**Data Requirements:**
- Sufficient historical data needed
- New assets have limited history
- Pattern library needs depth
- Quality over quantity

**Lag Between Detection and Display:**
- Pattern detected → Validation → Discovery created → UI display
- Typically <30 seconds total
- Real-time but not instantaneous
- Lag increases during high volatility (more patterns to process)

#### Layer 3: Kairos Interface

**What Kairos Provides:**

**Visualization:**
- Translate complex data into understandable cards
- Progress bars, charts, metrics
- Real-time updates
- Historical context display

**Organization:**
- Rank discoveries by relevance
- Filter by user criteria
- Paginate for manageability
- Structure information hierarchically

**Interaction:**
- Click for details
- Hover for tooltips
- Filter and sort
- Navigate efficiently

**Transparency:**
- Show every discovery (no cherry-picking)
- Display all outcomes (wins and losses)
- Historical performance statistics
- Complete audit trail

**What Kairos Doesn't Provide:**

- Trading recommendations or advice
- Position sizing guidance
- Entry/exit timing
- Risk management rules
- Portfolio allocation
- Financial planning

#### The Complete Flow

**Real-Time Discovery Creation:**

\`\`\`
Exchange Trade Occurs
        ↓
Butterfly Captures Tick (< 100ms)
        ↓
Features Calculated in Real-Time
        ↓
Pattern Matching Against Library
        ↓
Threshold Check (Met or Not Met)
        ↓
If Met: Discovery Created
        ↓
Discovery Appears in Kairos (<30s total)
        ↓
User Sees Discovery Card
        ↓
User Conducts Independent Analysis
        ↓
User Makes Decision
        ↓
User Executes (or doesn't)
        ↓
Pattern Tracks Forward
        ↓
Outcomes Recorded
        ↓
Statistics Updated
        ↓
Future Discoveries Benefit from Additional History
\`\`\`

**Historical Performance Tracking:**

\`\`\`
Discovery Created at T0
        ↓
Forward Tracking Begins
        ↓
Every Tick Monitored
        ↓
Target Hits Recorded (if occur)
        ↓
Drawdown Tracked Continuously
        ↓
Risk Zone Touches Noted
        ↓
Time-to-Resolution Calculated
        ↓
Pattern Outcome Classified
        ↓
Added to Historical Statistics
        ↓
Displayed in Future Discovery Context
\`\`\`

**This end-to-end transparency is what separates Kairos from black-box systems. You can validate every step.**

---

### Non-Parametric Statistical Models Explained

Understanding the model approach helps you interpret discoveries appropriately.

#### What "Non-Parametric" Means

**Parametric Models:**

Traditional statistical models make assumptions:

**Normal Distribution Assumption:**
\`\`\`
Assumes returns follow bell curve:
- Most outcomes near mean
- Few extreme outcomes
- Symmetric tails
- Predictable probabilities
\`\`\`

**Reality in Crypto:**
\`\`\`
Returns have fat tails:
- Extreme moves common
- Asymmetric (crashes faster than rallies)
- Unpredictable clustering
- Violates normal assumption
\`\`\`

**Stable Parameters Assumption:**
\`\`\`
Assumes relationships don't change:
- Volatility is constant (or predictably changing)
- Correlations are stable
- Market structure doesn't shift
\`\`\`

**Reality in Crypto:**
\`\`\`
Everything changes:
- Volatility regime shifts
- Correlations break down in stress
- Market structure evolves rapidly
- New tokens, new dynamics
\`\`\`

**Linear Relationships Assumption:**
\`\`\`
Assumes Y = aX + b:
- Simple cause-effect
- Proportional responses
- Additive effects
\`\`\`

**Reality in Crypto:**
\`\`\`
Non-linear dynamics:
- Feedback loops
- Threshold effects
- Complex interactions
- Chaotic behavior
\`\`\`

**Non-Parametric Approach:**

Instead of assumptions, work with actual data:

**Empirical Distributions:**
- Observe what actually happens
- Don't impose theoretical distribution
- Let data show its own shape
- No assumption about "normal"

**Adaptive to Regime:**
- If market behavior changes, model adapts
- No fixed parameters
- Learning from recent behavior
- Robust to structural shifts

**Pattern-Based:**
- Find similar historical situations
- Study what happened then
- Apply context to current situation
- No equation assuming Y=f(X)

**Pros and Cons:**

**Advantages:**
- Works in any market regime
- Doesn't require unrealistic assumptions
- Robust to outliers and fat tails
- Captures complex patterns
- Adapts to evolving markets

**Disadvantages:**
- Requires large datasets
- Computationally intensive
- Harder to explain (no simple equation)
- Vulnerable to unprecedented events
- Can overfit if not careful

#### How Patterns Are Built

**Historical Pattern Library Construction:**

**Step 1: Feature Engineering**

For every historical moment, calculate:
- Order flow features (30+ metrics)
- Volume profile features (20+ metrics)
- Market profile features (15+ metrics)
- Price action features (25+ metrics)
- Liquidity features (10+ metrics)

Total: 100+ dimensional feature space

**Step 2: Pattern Clustering**

Find similar historical moments:
- Calculate distances in feature space
- Cluster similar market states
- Label clusters by outcomes
- Build pattern library

**Step 3: Outcome Analysis**

For each cluster, study what happened next:
- How often did price rise X%?
- How often did price fall Y%?
- What was typical drawdown?
- How long did patterns take?
- What percentage invalidated early?

**Step 4: Statistical Significance**

Determine which patterns are robust:
- Sufficient sample size (minimum occurrences)
- Consistent outcomes (not random)
- Out-of-sample validation (test on unseen data)
- Statistical tests (not chance)

**Step 5: Threshold Calibration**

Set thresholds for detection:
- Conservative: Tight thresholds (high confidence, fewer detections)
- Moderate: Balanced thresholds
- Aggressive: Wider thresholds (lower confidence, more detections)

**Example Simplified:**

\`\`\`
Historical Analysis of "Strong Buy Pressure + Volume Spike"

Found 237 instances in last 2 years
Outcomes:
- 68% price increased 5%+ within 24 hours
- 15% price decreased 3%+ within 24 hours
- 17% no significant move (< 3% either direction)

Average gain when successful: +8.2%
Average loss when failed: -4.3%
Average max drawdown during progression: -2.1%

This pattern becomes part of library.

When current market shows similar features:
- If similarity > threshold → Create discovery
- Set targets based on historical typical outcomes
- Set risk zone based on historical failures
- Track forward to see if current instance follows historical pattern
\`\`\`

#### Why This Approach for Crypto

**Crypto-Specific Challenges:**

**1. Limited History:**
- Most assets <5 years old
- Many <2 years
- Can't rely on decades of data like stocks

**Non-parametric solution:** Learn from what history exists, adapt as more data accumulates.

**2. Rapid Evolution:**
- New token mechanics constantly
- DeFi innovations change behavior
- Market structure shifts frequently

**Non-parametric solution:** No fixed assumptions to become outdated. Patterns adapt to current data.

**3. Extreme Volatility:**
- 20%+ daily moves common
- Flash crashes regular occurrence
- Normal distribution useless

**Non-parametric solution:** Handle fat tails naturally. Extreme outcomes are data points, not outliers to discard.

**4. Thin Liquidity:**
- Many assets have low volume
- Order books shallow
- Microstructure noise high

**Non-parametric solution:** Microstructure focus captures liquidity dynamics that simpler models miss.

**5. 24/7 Markets:**
- No closing bell
- Patterns can develop anytime
- Global participation

**Non-parametric solution:** Continuous monitoring and pattern detection. No assumptions about "trading hours."

#### Model Performance and Validation

**How Quant Labs Validates Models:**

**Out-of-Sample Testing:**
\`\`\`
Training Data: 2020-2022 (build pattern library)
Test Data: 2023 (never seen by model)

Apply model to 2023 data
Measure: Do patterns still work?
Adjust: If performance degrades

Never optimize on test data (would be cheating)
\`\`\`

**Walk-Forward Analysis:**
\`\`\`
Train on month 1-6
Test on month 7
Re-train on month 2-7
Test on month 8
Repeat...

Simulates real-world deployment
Shows if model adapts or degrades over time
\`\`\`

**Multiple Regimes:**
\`\`\`
Test across different market conditions:
- Bull markets
- Bear markets
- High volatility
- Low volatility
- Trending
- Range-bound

Model should work (or gracefully degrade) in all regimes
\`\`\`

**Statistical Tests:**
\`\`\`
- Are results statistically significant?
- Could outcomes be random chance?
- Confidence intervals and p-values
- Multiple testing corrections
\`\`\`

**What Validation Shows:**

Models work statistically but imperfectly:
- Some discoveries work, many don't
- Historical performance varies
- No discovery is guaranteed
- Edge is statistical, not deterministic

**This is expected and acceptable. We're not seeking perfection, but statistical edge with transparency.**

**What Users Should Know:**

1. Models are sophisticated but not magic
2. Performance will vary by market regime
3. Historical statistics describe past, not future
4. Your outcomes depend on YOUR execution
5. Losses will occur regularly (normal)
6. Edge is aggregate over many discoveries, not per discovery

**If you expect every discovery to work, you'll be disappointed. If you understand statistical edge and manage risk accordingly, Kairos provides valuable intelligence.**

---

## Analytical Use Cases (Comprehensive)

This section provides detailed workflows for different user types and strategies. These are analytical frameworks, not trading strategies or recommendations.

**Critical Preface:**

Everything in this section describes how users MIGHT integrate Kairos into their existing analytical processes. These are NOT:
- Trading strategies to follow
- Recommendations or advice
- Signals or entry/exit rules
- Guaranteed approaches
- Complete methodologies

Every example requires:
- Independent validation
- Comprehensive analysis beyond Kairos
- Risk management discipline
- Personal decision-making
- Acceptance of full responsibility

### Use Case 1: Short-Term Active Trading

**User Profile:**
- Day traders and scalpers
- Hold positions minutes to hours
- Multiple trades daily
- Technical analysis focused
- High screen time

**How Kairos Might Fit Your Workflow:**

**Morning Routine (Pre-Market Analysis):**

1. **Market Scan (5-10 minutes):**
   - Open Kairos, select Conservative + Moderate risk profiles
   - Review Market Outlook for new overnight discoveries
   - Note 5-10 assets with high-ranked opportunities
   - Check for risk alerts on your watchlist assets
   - Export interesting pairs to your trading watchlist

2. **Discovery Assessment:**
   For each flagged discovery:
   - Check: When discovered? (Very recent = more relevant)
   - Check: Current progress? (Early stage vs late stage)
   - Check: Risk zone proximity? (How much room before invalidation)
   - Flag: Those with <10% progress, discovered <2 hours ago

3. **Independent Technical Analysis:**
   On your charting platform (TradingView, etc.):
   - Check YOUR indicators (RSI, MACD, your custom tools)
   - Identify support/resistance levels
   - Analyze volume profile
   - Check order book depth
   - Validate: Does YOUR analysis agree with discovery?

4. **Fundamental Quick Check:**
   - Recent news on the asset?
   - Any upcoming events (token unlocks, announcements)?
   - Broader sector performing well?
   - Overall market sentiment?

5. **Setup Documentation:**
   Create trading plan for validated setups:
   \`\`\`
   Asset: ATOM/USDT
   Kairos Discovery: Conservative upside, T1 at $11.50 (+8%)
   Your Technical: Breakout from consolidation, volume increasing
   Your Entry Criteria: Break above $10.80 with volume
   Your Position Size: 2% of capital
   Your Stop Loss: $10.20 (below support, not just risk zone)
   Your Profit Targets: 50% at $11.20, 30% at $11.50, 20% runner
   Your Exit Rules: Trail stop on runner, exit all if invalidated
   Risk/Reward: Risking $0.60 for potential $0.70+ = 1:1.17+
   \`\`\`

**During Trading Session:**

6. **Active Monitoring:**
   - Kairos in one screen (paused mode to avoid distraction)
   - Charting platform in another
   - Execute based on YOUR criteria, not Kairos changes
   - Don't chase discoveries that already moved

7. **Entry Execution:**
   When YOUR entry criteria met:
   - Enter position per your plan
   - Set stop loss immediately
   - Set profit targets
   - Note entry price vs discovery entry (for learning)

8. **Position Management:**
   - Manage based on YOUR rules
   - Don't automatically exit at Kairos targets
   - Don't automatically hold through risk zone
   - Follow YOUR trading plan

9. **New Discovery Alerts:**
   - Check Kairos hourly for new discoveries
   - Assess if they meet your criteria
   - Don't abandon existing plan for shiny new discovery

**End of Day:**

10. **Performance Review:**
    - Which discoveries did you trade?
    - How did your entries compare to discovery entries?
    - How did your exits compare to target hits?
    - What did you learn?
    - What would you do differently?

**Example Day:**

\`\`\`
9:00 AM: Market scan
- Kairos shows 12 new conservative discoveries overnight
- Flag ATOM, MATIC, FTM for deeper analysis

9:15 AM: Technical analysis
- ATOM: Breaking consolidation, volume good, RSI neutral
- MATIC: Overbought on your indicators, skip
- FTM: Low volume, skip

9:30 AM: Setup plan for ATOM
- Entry: $10.85 breakout
- Stop: $10.25
- Targets: $11.15 (50%), $11.45 (30%), $11.80 (20%)
- Risk: $0.60, Reward: $0.30-0.95

10:15 AM: ATOM breaks $10.85 with volume
- Enter 2% position at $10.87 (slightly worse fill)
- Set stop at $10.25

11:45 AM: ATOM reaches $11.15
- Exit 50% at $11.13 (actual fill)
- Move stop to breakeven on remaining
- Target 1 hit, booked +2.4% on 50%

1:30 PM: ATOM reaches $11.42
- Exit 30% at $11.40
- Trail stop on final 20% at $11.20
- Target 2 nearly hit, booked +4.9% on 30%

2:45 PM: ATOM pulls back to $11.22
- Trailing stop hit, exit final 20% at $11.21
- Booked +3.1% on 20%

End of Day: Total trade +3.2% on 2% position = +0.064% portfolio
Discovery eventually hit T1 at $11.50, but you already exited.
Your plan worked. You captured good portion without hoping for perfection.
\`\`\`

**Key Principles for Short-Term Trading:**

1. **Kairos is a screener, not a signal**
   - Use to find candidates
   - Validate with YOUR analysis
   - Execute YOUR strategy

2. **Speed matters but don't chase**
   - Fresh discoveries more relevant
   - But don't FOMO into moved prices
   - Wait for YOUR entry criteria

3. **Your rules override Kairos levels**
   - Targets are references, not your exits
   - Risk zones are context, not your stops
   - YOUR plan is what matters

4. **Progress tracking is learning tool**
   - Compare your results to discovery tracking
   - Learn: Earlier entry better? Later better?
   - Refine: Your criteria over time

5. **Conservative profiles match timeframe**
   - Day trading needs short-term patterns
   - Aggressive profiles too slow
   - Match profile to your holding period

**Common Mistakes:**

❌ Entering immediately upon seeing discovery
❌ Using risk zone as automatic stop without analysis
❌ Holding for all targets when your plan says exit
❌ Abandoning your system to follow discoveries
❌ Trading every discovery without selectivity

✓ Using discoveries to populate watchlist
✓ Validating each with independent analysis
✓ Following YOUR trading plan
✓ Learning from comparison to discovery outcomes
✓ Being selective based on your criteria


### Use Case 2: Swing and Position Trading

**User Profile:**
- Hold positions days to weeks
- 5-20 trades per month
- Balance technical and fundamental analysis
- Medium-term market views
- Lower screen time than day traders

**How Kairos Might Fit Your Workflow:**

**Weekly Planning Session (Sunday Evening, 30-60 minutes):**

1. **Market Overview:**
   - Open Kairos with Moderate + Aggressive profiles
   - Review Market Outlook for both upside and downside
   - Note clustering patterns (many discoveries = market regime signal)
   - Identify 10-15 assets for deeper research

2. **Discovery Prioritization:**
   
   **Tier 1 (High Priority):**
   - Assets already on your fundamental watchlist
   - Discoveries with <20% progress (early stage)
   - Multiple risk profiles agreeing (conservative + moderate + aggressive)
   - Discovered within last 3 days

   **Tier 2 (Medium Priority):**
   - New assets you don't know well but show strong patterns
   - Single aggressive discovery with large magnitude
   - 20-50% progress (partial development)

   **Tier 3 (Lower Priority):**
   - Assets you're unfamiliar with
   - Very advanced progress (>70%)
   - Contradictory signals across profiles
   - Very old discoveries (>2 weeks)

3. **Fundamental Research (Per Asset, 15-30 minutes):**

   **For each Tier 1 discovery:**
   
   **Project Quality:**
   - Read whitepaper or project documentation
   - Review GitHub activity (for tech projects)
   - Check team backgrounds and track record
   - Assess product-market fit
   - Evaluate competitive positioning

   **Tokenomics:**
   - Total supply and circulating supply
   - Inflation schedule and unlock events
   - Token utility and demand drivers
   - Holder distribution (whale concentration)
   - Exchange listings and liquidity

   **Recent Developments:**
   - News from last 30 days
   - Partnership announcements
   - Product launches or updates
   - Regulatory developments
   - Community sentiment shifts

   **Financial Metrics:**
   - Trading volume trends
   - Market cap and valuation
   - Revenue (if applicable)
   - TVL (for DeFi projects)
   - User growth metrics

   **Macro Context:**
   - Overall crypto market trend
   - Sector performance (DeFi, gaming, L1, L2, etc.)
   - Correlation with BTC/ETH
   - Risk-on vs risk-off environment

4. **Technical Validation:**

   On your charting platform:
   - Weekly and daily timeframe analysis
   - Key support/resistance levels
   - Moving averages (50, 200 MA)
   - Volume trends
   - RSI, MACD on higher timeframes
   - Previous consolidation zones
   - Fibonacci retracement levels

5. **Synthesis and Decision:**

   **Create a thesis document for each potential position:**
   
   \`\`\`
   ASSET: AVAX/USDT
   DATE: January 15, 2025
   
   KAIROS DISCOVERY:
   - Moderate upside discovered 2 days ago
   - Entry: $35.50, Current: $36.20 (+2% progress)
   - T1: $39.50 (+11%), T2: $43.00 (+21%), T3: $48.00 (+35%)
   - Risk Zone: $33.00 (-7%)
   - Historical: Max growth +18% (DD: -5%), Overall +28% (DD: -8%)
   
   FUNDAMENTAL THESIS:
   ✓ Strong ecosystem growth (subnets launching)
   ✓ Upcoming major partnership announcement rumored
   ✓ Developer activity increasing 40% QoQ
   ✓ Institutional interest evident (Grayscale trust)
   ✓ Reasonable valuation vs competitors
   ⚠ Token unlock in 6 weeks (moderate concern)
   ⚠ High correlation with ETH (diversification limited)
   
   TECHNICAL ANALYSIS:
   ✓ Breaking out of 3-month consolidation
   ✓ Volume increasing on breakout
   ✓ Weekly MACD turning bullish
   ✓ Held 50-week MA as support
   ⚠ Approaching previous resistance at $40
   
   MACRO CONTEXT:
   ✓ Altcoin season indicators positive
   ✓ BTC dominance declining (good for alts)
   ⚠ Fed meeting in 2 weeks (volatility risk)
   
   POSITION PLAN:
   Entry Strategy:
   - Primary: Market buy 50% position now ($36.20)
   - Secondary: Limit buy 50% position at $35.00 (on pullback)
   - Cancel secondary if price breaks $38.50 (FOMO protection)
   
   Position Size:
   - 5% of portfolio (calculated for -10% drawdown tolerance)
   - If only primary fills: 2.5% position (acceptable)
   
   Stop Loss:
   - Initial: $33.50 (-7.5% from entry)
   - Rationale: Below risk zone, below consolidation support
   - Tighten to breakeven after 15% gain
   
   Profit Taking:
   - 40% at $39.00 (+8%) - Slightly before T1 for guaranteed profit
   - 30% at $42.50 (+17%) - Before T2, near previous resistance
   - 20% at $47.00 (+30%) - Before T3
   - 10% runner with trailing stop at -10% from peak
   
   Time Horizon:
   - Expected: 2-4 weeks based on moderate profile
   - Maximum: 8 weeks (re-evaluate if no progress)
   
   Exit Criteria (Thesis Invalidation):
   - Stop loss hit (price-based invalidation)
   - Token unlock brings major selling pressure
   - Rumored partnership denied officially
   - Major competitor launches superior product
   - Sector rotation away from L1s
   - Federal policy unexpectedly hawkish
   
   Review Schedule:
   - Daily: Quick price check, news monitoring
   - Weekly: Full thesis review, progress assessment
   - At each target: Partial exit decision
   \`\`\`

**During the Week:**

6. **Daily Monitoring (10-15 minutes):**
   
   **Morning Check:**
   - Review Kairos for new risk alerts on your positions
   - Check progress on existing discoveries you're in
   - Scan news aggregators for your holdings
   - Note any major market moves overnight

   **Evening Review:**
   - Update position tracking spreadsheet
   - Check if any of your profit targets approached
   - Review new discoveries on your watchlist assets
   - Prepare orders for next day if needed

7. **Weekly Deep Review (30 minutes):**
   
   For each active position:
   - Does fundamental thesis still hold?
   - How is discovery progressing vs expectations?
   - Any new risk alerts emerged?
   - Should stops be adjusted?
   - Any signs of thesis invalidation?
   - Emotional check: Are you comfortable with position?

8. **New Position Opportunities:**
   
   Check Kairos 2-3 times during week:
   - New discoveries on watchlist assets?
   - Risk alerts suggesting exits or hedges?
   - Changed filters to scan different segments?

**Example Multi-Week Position:**

\`\`\`
Week 1:
- Discovery on AVAX at $35.50
- Your research validates thesis
- Enter 50% at $36.20, limit order 50% at $35.00
- Pullback to $34.80, second entry fills at $35.00
- Average entry: $35.60
- Price ends week at $37.20 (+4.5%)

Week 2:
- AVAX grinds higher to $38.90
- Target 1 at $39.00 approaching
- You exit 40% at $39.10 (+9.8%)
- Move stop to breakeven ($35.60) on remaining 60%
- Price consolidates at $38.50
- Kairos shows pattern at 22% progress

Week 3:
- Partnership announcement confirmed (fundamental catalyst)
- Price surges to $43.50
- You exit 30% at $42.60 (+19.7%) 
- Trail stop on remaining 30% at $38.00
- Kairos shows T2 hit, pattern at 88% progress
- Conservative downside discovery emerges (consolidation signal)

Week 4:
- Price pulls back to $40.50
- You hold with trail stop
- Price recovers to $44.00
- You exit 20% at $44.20 (+24.2%)
- Final 10% runner continues with trail at $39.60

Week 5:
- Price reaches $46.80
- Trail stop now at $42.12 (10% from peak)
- Fed meeting causes volatility
- Stop triggered at $42.00 (+18.0% on final 10%)

Total Position Performance:
40% sold at +9.8% = +3.92%
30% sold at +19.7% = +5.91%
20% sold at +24.2% = +4.84%
10% sold at +18.0% = +1.80%
Total: +16.47% on 5% position = +0.82% portfolio gain

Discovery Tracking:
Entry: $35.50
Your Avg Entry: $35.60 (slightly worse)
T1: $39.00 (hit in week 2)
T2: $43.00 (hit in week 3)
T3: $48.00 (not hit, discovery showed 94% progress max)

Lessons:
- Entering slightly after discovery still captured most move
- Your partial exits worked well (took profits systematically)
- Fundamental catalyst (partnership) drove move beyond typical
- Conservative downside discovery correctly signaled consolidation
- Your thesis-based approach + Kairos timing = strong outcome
\`\`\`

**Key Principles for Swing/Position Trading:**

1. **Fundamental thesis is primary**
   - Kairos provides timing context
   - Never enter without fundamental conviction
   - Technical and patterns support, don't drive decision

2. **Patience for entry**
   - Don't chase discoveries that already moved
   - Wait for pullbacks to better risk/reward
   - Use limit orders strategically

3. **Systematic profit-taking**
   - Don't hold for perfect exits
   - Lock in profits at logical levels
   - Keep runner for upside surprise

4. **Thesis monitoring**
   - Regularly review fundamental assumptions
   - Exit if thesis invalidates, regardless of price
   - Risk alerts can indicate thesis problems

5. **Timeframe matching**
   - Moderate/Aggressive profiles match swing timeframes
   - Conservative too short-term
   - Be patient with pattern development

**Common Mistakes:**

❌ Trading discoveries without fundamental research
❌ Entering late in pattern development
❌ Holding through thesis invalidation because "pattern hasn't failed"
❌ Ignoring macro context for microstructure patterns
❌ Over-trading (forgetting you're a swing trader, not day trader)

✓ Deep fundamental research before any position
✓ Waiting for better entries (patience)
✓ Systematic profit-taking
✓ Regular thesis review and adjustment
✓ Respecting your timeframe and strategy

---

### Use Case 3: Portfolio Construction and Rebalancing

**User Profile:**
- Manages diversified crypto portfolio
- 5-20 holdings across different sectors
- Quarterly or monthly rebalancing
- Risk-adjusted returns focus
- Asset allocation methodology

**How Kairos Might Fit Your Workflow:**

**Quarterly Portfolio Review (4 hours, systematic process):**

1. **Portfolio Health Assessment:**

   **Current Allocation Review:**
   \`\`\`
   Target Allocation:
   - BTC: 40% (Large cap, store of value)
   - ETH: 25% (Large cap, smart contract platform)
   - Large Alts (ADA, DOT, AVAX): 20% (Diversified L1s)
   - Mid Caps (MATIC, LINK, ATOM): 10% (Infrastructure)
   - Small Caps: 5% (High risk/reward)
   
   Current Allocation (after 3 months):
   - BTC: 35% (-5% vs target, underweight)
   - ETH: 30% (+5% vs target, overweight)
   - Large Alts: 22% (+2% vs target, slightly overweight)
   - Mid Caps: 8% (-2% vs target, slightly underweight)
   - Small Caps: 5% (on target)
   \`\`\`

2. **Kairos Market Intelligence:**

   **Open Kairos with all risk profiles:**
   - Review Market Outlook for all current holdings
   - Note which holdings have risk alerts (potential weakness)
   - Note which holdings have upside discoveries (potential strength)
   - Look for patterns across the portfolio

   **Example Findings:**
   \`\`\`
   Risk Alerts (Potential Weakness):
   - AVAX: Aggressive downside discovered 5 days ago
   - DOT: Moderate downside discovered yesterday
   - ADA: No alerts
   
   Upside Discoveries (Potential Strength):
   - BTC: Conservative upside discovered today
   - ATOM: Moderate upside discovered 3 days ago
   - MATIC: No discoveries
   
   Interpretation:
   - Large alt exposure showing weakness (AVAX, DOT both flagged)
   - BTC showing relative strength (underweight but strong pattern)
   - Mid caps mixed (ATOM strong, MATIC neutral, LINK not in discoveries)
   \`\`\`

3. **Fundamental Reassessment:**

   For each holding with risk alert:
   - Has fundamental thesis deteriorated?
   - Recent negative news or developments?
   - Sector falling out of favor?
   - Competition intensifying?
   - Regulatory concerns?

   For each holding with upside discovery:
   - Fundamental improvements validating pattern?
   - Recent positive catalysts?
   - Sector rotation favorable?
   - Undervalued vs peers?

4. **Rebalancing Decision Framework:**

   **Strategic vs Tactical Considerations:**
   
   **Strategic (Long-term allocation):**
   - Target allocation still appropriate?
   - Portfolio risk profile correct?
   - Diversification adequate?
   - Correlation structure healthy?

   **Tactical (Short-term adjustments):**
   - Which holdings showing strength/weakness?
   - Kairos discoveries confirming trends?
   - Opportunity to improve risk-adjusted returns?
   - Tax implications of trades?

5. **Rebalancing Plan Creation:**

   \`\`\`
   REBALANCING PLAN - Q1 2025
   
   Portfolio Value: $100,000
   Rebalancing Threshold: 5% drift from target
   
   SELLS (Reduce overweight, take profits, address weakness):
   
   1. ETH: $30,000 → $25,000 (Sell $5,000)
      Rationale: 
      - Overweight by 5%
      - No strong Kairos patterns (neutral)
      - Take profits after strong Q4 performance
      - Reduce to target allocation
   
   2. AVAX: $7,000 → $5,000 (Sell $2,000)
      Rationale:
      - Aggressive downside alert on Kairos (risk emerging)
      - Fundamental thesis weakening (competitor gaining share)
      - Within large alt allocation, rotate to stronger asset
      - Not complete exit (thesis not invalidated, just weakening)
   
   3. DOT: $8,000 → $6,000 (Sell $2,000)
      Rationale:
      - Moderate downside alert on Kairos
      - Parachain activity declining (fundamental concern)
      - Reduce exposure, maintain small position
      - Large alt allocation still adequate with ADA
   
   BUYS (Add to underweight, capitalize on strength):
   
   4. BTC: $35,000 → $40,000 (Buy $5,000)
      Rationale:
      - Underweight by 5%
      - Conservative upside discovery on Kairos (strength)
      - Macro environment favoring store of value
      - Restore to target allocation
   
   5. ATOM: $3,000 → $5,000 (Buy $2,000)
      Rationale:
      - Moderate upside discovery on Kairos
      - Fundamental thesis strengthening (IBC adoption growing)
      - Within mid cap allocation, add to strongest performer
      - Fits risk-adjusted return goal
   
   6. Small Cap Research (Buy $2,000):
      Rationale:
      - Freed up capital from AVAX/DOT reduction
      - Research new small cap opportunities
      - Review Kairos Market Outlook for undiscovered gems
      - Due diligence before allocation (placeholder)
   
   TAX CONSIDERATIONS:
   - ETH sale: Long-term cap gains (held >1 year) - acceptable
   - AVAX sale: Short-term cap gains (held 8 months) - higher tax, but thesis weakening justifies
   - DOT sale: Long-term cap gains - acceptable
   
   NET EFFECT:
   - Reduced overweight positions
   - Increased underweight positions  
   - Rotated from weakness to strength
   - Maintained diversification
   - Restored target allocation
   
   EXECUTION PLAN:
   - Place sells first (free up capital)
   - Execute over 2-3 days (avoid market impact)
   - Use limit orders (minimize slippage)
   - Place buys after sells settle
   - Document all trades for tax records
   \`\`\`

6. **Monthly Check-ins (30 minutes):**

   Between quarterly rebalances:
   - Review Kairos for new risk alerts on holdings
   - Assess if emergency rebalance needed (>10% drift)
   - Monitor fundamental thesis for each holding
   - Note opportunities for next quarterly review

   **Emergency Rebalance Triggers:**
   - Position grows to >15% of portfolio (concentration risk)
   - Multiple aggressive downside alerts + fundamental deterioration
   - Major negative news requiring immediate action
   - Regulatory event threatening viability
   - Sector-wide collapse requiring de-risking

**Example Quarterly Cycle:**

\`\`\`
Q4 2024 (Starting Point):
Portfolio: $100,000
BTC: $40,000 (40%)
ETH: $25,000 (25%)
Large Alts: $20,000 (20%)
Mid Caps: $10,000 (10%)
Small Caps: $5,000 (5%)

Q4 Performance:
BTC: +15% → $46,000
ETH: +35% → $33,750
Large Alts: +20% → $24,000
Mid Caps: -5% → $9,500
Small Caps: +10% → $5,500
Total Portfolio: +18.75% → $118,750

New Allocation:
BTC: $46,000 (38.7%) - Underweight
ETH: $33,750 (28.4%) - Overweight
Large Alts: $24,000 (20.2%) - On target
Mid Caps: $9,500 (8.0%) - Underweight
Small Caps: $5,500 (4.6%) - Slightly underweight

Q1 2025 Rebalancing Decision:
- ETH exceeded allocation by 3.4% (approaching 5% threshold)
- Kairos shows BTC strength, ETH neutral
- Rebalance: Sell some ETH, buy BTC and mid caps
- Restore target allocation
- Lock in ETH profits

Action:
Sell: ETH $3,000 (reduce to 25.9%)
Buy: BTC $1,500 (increase to 40.0%)
Buy: Mid Caps $1,500 (increase to 9.3%)

Post-Rebalance:
Back to approximately target allocation
Ready for Q1 performance cycle
\`\`\`

**Integration with Kairos:**

**Kairos as Confirmation Tool:**
- Rebalancing decisions primarily allocation-driven
- Kairos discoveries provide timing refinement
- Risk alerts warn of potential portfolio problems
- Upside discoveries confirm strength to add to

**Kairos as Research Tool:**
- Market Outlook for discovering new assets
- Pattern clustering for sector rotation signals
- Cross-asset analysis for correlation shifts
- Risk alert clustering for market regime detection

**Key Principles for Portfolio Management:**

1. **Policy-driven, not pattern-chasing**
   - Rebalancing thresholds set in advance
   - Kairos informs, doesn't dictate
   - Systematic approach maintained
   - Discipline over opportunism

2. **Diversification preserved**
   - Don't abandon allocation for hot patterns
   - Maintain sector exposure balance
   - Consider correlation structure
   - Risk management primary goal

3. **Tactical adjustments within strategic framework**
   - Small tilts toward strength/away from weakness
   - Within allocation bands
   - Based on multiple factors (not Kairos alone)
   - Regular reversion to targets

4. **Tax efficiency considered**
   - Timing of rebalances
   - Long-term vs short-term gains
   - Harvesting losses strategically
   - Cost-benefit analysis of trades

5. **Regular review schedule**
   - Quarterly deep analysis
   - Monthly monitoring
   - Emergency protocols defined
   - Emotional discipline maintained

**Common Mistakes:**

❌ Chasing patterns and destroying allocation
❌ Over-rebalancing (transaction costs and taxes)
❌ Abandoning diversification for concentrated bets
❌ Ignoring tax implications
❌ Emotional decisions overriding policy

✓ Maintaining strategic allocation discipline
✓ Using Kairos for tactical refinement only
✓ Systematic rebalancing schedule
✓ Tax-aware execution
✓ Regular performance review

---

### Use Case 4: DCA (Dollar-Cost Averaging) Strategies

**User Profile:**
- Invests fixed amount regularly (weekly/monthly)
- Long-term accumulation strategy
- Reduces timing risk through averaging
- Systematic discipline prioritized
- Emotional detachment from volatility

**How Kairos Might Fit Your Workflow:**

**Critical Preface for DCA Users:**

DCA's power is **systematic discipline**. The strategy works by removing emotion and timing decisions. Using Kairos to "optimize" DCA can DESTROY its benefits if you let pattern-chasing undermine your system.

**Kairos should provide minor tactical adjustments at most, never wholesale abandonment of your schedule.**

**Monthly DCA Execution (With Kairos Context):**

1. **Standard DCA Baseline:**

   \`\`\`
   Your DCA Plan:
   Amount: $1,000/month
   Schedule: First Monday of each month
   Allocation:
   - BTC: $500 (50%)
   - ETH: $300 (30%)
   - ATOM: $100 (10%)
   - MATIC: $100 (10%)
   
   Strategy: Buy regardless of price, maintain allocation, hold long-term
   \`\`\`

2. **Pre-Purchase Kairos Check (30 minutes before monthly DCA):**

   **Step 1: Review Risk Alerts**
   
   Check if any of your DCA assets have risk alerts:
   \`\`\`
   BTC: No alerts (neutral)
   ETH: No alerts (neutral)
   ATOM: Aggressive downside alert (emerged 2 days ago)
   MATIC: Conservative downside alert (emerged yesterday)
   \`\`\`

   **Step 2: Review Upside Discoveries**
   
   Check for upside patterns:
   \`\`\`
   BTC: Conservative upside discovered today
   ETH: Moderate upside discovered 1 week ago
   ATOM: Aggressive upside + Aggressive downside (contradictory)
   MATIC: No upside discoveries
   \`\`\`

3. **Tactical Adjustment Decision Framework:**

   **Option A: No Adjustment (Default, 80% of months)**
   
   Execute standard allocation regardless of Kairos:
   - BTC: $500
   - ETH: $300
   - ATOM: $100
   - MATIC: $100

   **When to choose this:**
   - No strong patterns
   - Patterns contradictory
   - Maintaining discipline more important
   - You're uncomfortable with adjustments

   **This is the default. When in doubt, no adjustment.**

   **Option B: Minor Tactical Tilt (Max 20% reallocation, 15% of months)**
   
   Slightly adjust allocation toward strength/away from weakness:
   \`\`\`
   Original: BTC $500, ETH $300, ATOM $100, MATIC $100
   
   Adjustment rationale:
   - ATOM: Contradictory signals (aggressive up + aggressive down) = Range-bound, slight reduce
   - MATIC: Downside alert + no upside = Weakness, slight reduce
   - BTC: Upside discovery = Slight increase
   - ETH: Upside discovery = Slight increase
   
   Adjusted: BTC $550 (+$50), ETH $330 (+$30), ATOM $70 (-$30), MATIC $50 (-$50)
   
   Change magnitude: 10% max per asset
   Still executing full $1,000 (not skipping DCA)
   Temporary tilt (will revert to standard next month)
   \`\`\`

   **When to choose this:**
   - Strong, clear patterns across multiple profiles
   - Fundamental thesis still intact for all assets
   - Comfortable with minor optimization
   - Can return to standard allocation next month

   **Option C: Pause Single Asset (Rare, 5% of months)**
   
   Completely skip one asset for this month:
   \`\`\`
   Original: BTC $500, ETH $300, ATOM $100, MATIC $100
   
   Decision: Pause MATIC completely
   
   Rationale:
   - Multiple downside alerts (conservative + aggressive)
   - Fundamental thesis deteriorating (development stalling)
   - Risk alerts + fundamental decline = Serious concern
   - Temporary pause, not permanent abandonment
   
   Adjusted: BTC $550, ETH $350, ATOM $100, MATIC $0
   
   Reallocate MATIC funds to other holdings
   Review MATIC next month (resume or permanent removal from DCA)
   \`\`\`

   **When to choose this:**
   - Severe risk alerts + fundamental deterioration
   - Pattern convergence showing systemic weakness
   - You're considering removing asset permanently
   - Rare exception, not regular practice

   **Option D: Never - Do Not Skip Entire DCA**
   
   ❌ Never skip your entire monthly purchase
   ❌ Never "wait for better prices" based on patterns
   ❌ Never go to cash because of market outlook
   
   This destroys DCA's purpose and typically underperforms.

4. **Execution (First Monday):**

   **Regardless of adjustment decision:**
   - Execute full $1,000 purchase
   - Use market or limit orders per your preference
   - Document purchase prices
   - Update tracking spreadsheet
   - Do NOT obsess over execution price (not the point of DCA)

5. **Monthly Review (After Purchase):**

   \`\`\`
   January 2025 DCA Execution:
   
   Pre-Purchase Kairos Analysis:
   - BTC: Upside discovery (strength)
   - ETH: Upside discovery (strength)
   - ATOM: Contradictory signals (neutral)
   - MATIC: Downside alert (weakness)
   
   Decision: Minor tactical tilt (Option B)
   - BTC: $550 (vs $500 standard)
   - ETH: $330 (vs $300 standard)
   - ATOM: $70 (vs $100 standard)
   - MATIC: $50 (vs $100 standard)
   
   Execution Prices:
   - BTC: $42,150 (bought 0.01305 BTC)
   - ETH: $2,640 (bought 0.125 ETH)
   - ATOM: $9.80 (bought 7.14 ATOM)
   - MATIC: $0.72 (bought 69.4 MATIC)
   
   Next Month Plan:
   - Return to standard allocation (no adjustment)
   - Monitor MATIC fundamentals (considering permanent reduction)
   - Continue systematic approach
   \`\`\`

6. **Quarterly DCA Strategy Review:**

   Every 3 months, assess overall DCA performance:
   
   **Performance Tracking:**
   \`\`\`
   Q4 2024 DCA Summary:
   
   Total Invested: $3,000 ($1,000/month × 3)
   
   Standard Allocation Results (what IF you had no adjustments):
   BTC: $1,500 invested → Now worth $1,680 (+12%)
   ETH: $900 invested → Now worth $1,035 (+15%)
   ATOM: $300 invested → Now worth $285 (-5%)
   MATIC: $300 invested → Now worth $270 (-10%)
   Total: $3,270 (+9%)
   
   Actual Results (with minor Kairos-informed tilts):
   BTC: $1,550 invested → Now worth $1,736 (+12%)
   ETH: $960 invested → Now worth $1,104 (+15%)
   ATOM: $250 invested → Now worth $238 (-5%)
   MATIC: $240 invested → Now worth $216 (-10%)
   Total: $3,294 (+9.8%)
   
   Kairos Tilts Impact:
   - Added $24 value through tilts (+0.8% vs standard)
   - 2 of 3 months kept standard allocation (discipline maintained)
   - 1 month minor tilt (BTC/ETH increase, ATOM/MATIC decrease)
   - Tilts aligned with subsequent performance (validation)
   
   Assessment:
   - Minor benefit from Kairos context
   - Discipline maintained (didn't abandon system)
   - Could have achieved similar with standard allocation
   - Kairos provided confidence in weak months (psychological value)
   \`\`\`

   **Allocation Review:**
   - Should any assets be permanently removed?
   - Should allocation percentages change?
   - Add new assets to DCA roster?
   - Adjust monthly amount?

**Advanced DCA Variation: Weighted DCA**

Some users vary purchase amounts based on market conditions while maintaining schedule:

\`\`\`
Standard DCA: $1,000 every month regardless

Weighted DCA: 
- Base amount: $800/month guaranteed
- Flexible amount: $200/month (50% to 250% based on conditions)

Conditions influencing flexible portion:
- Market down 20%+ from highs: 250% ($500)
- Market down 10-20%: 150% ($300)
- Market neutral: 100% ($200)
- Market up 10-20%: 75% ($150)
- Market up 20%+: 50% ($100)

Kairos role:
- Risk alert clustering: Treat as "market down" signal
- Upside discovery clustering: Treat as "market up" signal
- Provides microstructure context for macro assessment

Example:
Market down 15% from highs
Kairos showing 8+ aggressive downside alerts across top 20 assets
Weighted DCA: $800 base + $300 flexible = $1,100 this month

Month's allocation: More to BTC/ETH (flight to quality)
\`\`\`

**This is advanced and optional. Standard DCA with discipline is superior to inconsistent weighted DCA.**

**Key Principles for DCA with Kairos:**

1. **Schedule discipline is paramount**
   - Never skip scheduled purchases
   - Maintain regular intervals
   - Ignore short-term price movements
   - Systematic execution over optimization

2. **Adjustments must be minor**
   - Max 20% reallocation between assets
   - Temporary tilts, not permanent changes
   - Return to standard allocation regularly
   - Don't let adjustments become speculation

3. **Fundamental thesis drives permanent changes**
   - Kairos informs temporary tilts
   - Fundamental deterioration drives asset removal
   - New fundamental conviction drives asset addition
   - Patterns don't override thesis

4. **Measure discipline, not perfection**
   - Track adherence to schedule
   - Review whether adjustments helped or hurt
   - Assess psychological impact (stress vs confidence)
   - Optimize discipline, not returns

5. **Long-term perspective maintained**
   - DCA is multi-year strategy
   - Monthly variations insignificant
   - Discipline compounds over years
   - Short-term optimization risks long-term underperformance

**Common Mistakes:**

❌ Skipping purchases waiting for "better" prices
❌ Abandoning allocation to chase patterns
❌ Letting adjustments become day trading
❌ Obsessing over monthly execution prices
❌ Losing discipline through over-optimization

✓ Maintaining schedule regardless of market
✓ Minor tactical tilts within systematic framework
✓ Regular return to standard allocation
✓ Focus on discipline over optimization
✓ Long-term perspective maintained


### Use Case 5: Range and Grid Trading

**User Profile:**
- Automated or semi-automated trading strategies
- Range-bound market strategies
- Multiple simultaneous orders at different levels
- Volatility harvesting approach
- Technical analysis focused

**How Kairos Might Fit Your Workflow:**

**Initial Setup: Identifying Range-Bound Opportunities**

1. **Discovery Screening for Range Characteristics:**

   Open Kairos with all risk profiles:
   - Look for assets showing BOTH upside AND downside discoveries
   - Aggressive upside + Aggressive downside = Potential wide range
   - Conservative upside + Conservative downside = Potential tight range
   - Multiple profiles in both directions = Higher confidence range hypothesis

   **Example Findings:**
   \`\`\`
   SOL/USDT shows:
   - Aggressive upside discovery: T1 at $110 (+10% from current)
   - Aggressive downside discovery: R1 at $90 (-10% from current)
   - Current price: $100
   
   Interpretation: Potential range boundaries identified
   10% range on each side = 20% total range
   Suitable for grid trading IF validated
   \`\`\`

2. **Independent Range Validation:**

   **Before deploying grids based on discoveries, validate with:**

   **Volume Profile Analysis:**
   - Check order book depth at discovered levels
   - Identify high volume nodes (areas of fair value)
   - Look for volume shelves that might act as boundaries
   - Assess whether discovered levels align with volume structure

   **Market Profile:**
   - Time spent at various price levels
   - Value area high/low identification
   - Point of control location
   - Balance vs imbalance assessment

   **Technical Structure:**
   - Previous support/resistance at discovered levels
   - Consolidation patterns matching range hypothesis
   - Moving average confluence
   - Fibonacci levels alignment

   **Recent Price Action:**
   - Has price been ranging or trending?
   - Volatility declining (range-bound) or expanding (trending)?
   - Clean bounces at potential boundaries?
   - False breakouts testing boundaries?

   **Example Validation:**
   \`\`\`
   SOL/USDT Range Hypothesis: $90-$110
   
   Volume Profile:
   ✓ High volume node at $89-$91 (aligns with downside discovery)
   ✓ High volume node at $108-$112 (aligns with upside discovery)
   ✓ Lower volume in $95-$105 zone (middle of range)
   
   Market Profile:
   ✓ 70% of last 30 days spent between $92-$108
   ✓ Point of control at $100 (current price)
   
   Technical:
   ✓ Previous resistance at $110 (6 touches in last 2 months)
   ✓ Previous support at $90 (4 touches in last 2 months)
   ✓ 50-day MA at $100 (acting as pivot)
   
   Recent Action:
   ✓ Clean range for 45 days (no strong trend)
   ✓ Volatility declining (Bollinger bands contracting)
   ✓ Multiple false breakouts both directions
   
   Conclusion: Range hypothesis VALIDATED
   High confidence range boundaries: $90-$110
   \`\`\`

3. **Grid Configuration Design:**

   **Parameter Decisions:**

   **Range Boundaries:**
   \`\`\`
   Conservative Approach:
   - Set grid narrower than discovered range
   - Lower: $92 (inside downside discovery R1 at $90)
   - Upper: $108 (inside upside discovery T1 at $110)
   - Range: $92-$108 (16% total)
   - Buffer: 2% inside discoveries for safety
   
   Aggressive Approach:
   - Set grid matching or exceeding discovered range
   - Lower: $88 (outside downside discovery)
   - Upper: $112 (outside upside discovery)
   - Range: $88-$112 (27% total)
   - Risk: Breakout exposure higher
   \`\`\`

   **Grid Density:**
   \`\`\`
   Number of Grid Levels:
   - Tight grid (20+ levels): More trades, smaller profit per trade
   - Medium grid (10-15 levels): Balanced
   - Wide grid (5-8 levels): Fewer trades, larger profit per trade
   
   Decision factors:
   - Trading fees (more levels = more fees)
   - Volatility (higher vol = wider spacing works)
   - Capital available (more levels = more capital locked)
   - Management time (more levels = more complexity)
   
   Example: 10-level grid from $92-$108
   Spacing: ($108-$92)/10 = $1.60 between levels
   Levels: $92, $93.60, $95.20, $96.80, $98.40, $100, $101.60, $103.20, $104.80, $106.40, $108
   \`\`\`

   **Position Sizing Per Level:**
   \`\`\`
   Total Capital Allocated: $10,000
   Number of Levels: 10
   
   Option A: Equal sizing
   - $1,000 per level
   - Simple, balanced
   
   Option B: Pyramid sizing
   - More capital at extremes (range boundaries)
   - Less capital at middle
   - Example: $600 at middle, $1,200 at extremes
   - Rationale: Extremes offer better risk/reward
   
   Option C: Geometric weighting
   - Exponentially more at boundaries
   - Complex but optimal for mean reversion
   \`\`\`

4. **Grid Deployment:**

   **Initial Orders:**
   \`\`\`
   Buy Orders (Below Current Price $100):
   - $98.40: Buy $1,000 SOL
   - $96.80: Buy $1,000 SOL
   - $95.20: Buy $1,000 SOL
   - $93.60: Buy $1,000 SOL
   - $92.00: Buy $1,000 SOL
   
   Sell Orders (Above Current Price $100):
   - $101.60: Sell $1,000 SOL
   - $103.20: Sell $1,000 SOL
   - $104.80: Sell $1,000 SOL
   - $106.40: Sell $1,000 SOL
   - $108.00: Sell $1,000 SOL
   
   Total Buy Orders: $5,000 (requires liquidity)
   Total Sell Orders: Requires owning $5,000 SOL upfront
   \`\`\`

   **Automation vs Manual:**
   - Automated bots: Set and monitor
   - Semi-automated: Alerts when orders fill, manual replacement
   - Fully manual: Spreadsheet tracking, manual order placement

**Ongoing Management:**

5. **Daily Monitoring (15 minutes):**

   **Check Kairos for Pattern Changes:**
   \`\`\`
   Morning Check:
   - Any new aggressive discoveries in single direction?
   - Risk alerts clustering?
   - Pattern changes suggesting range breaking?
   
   If YES to any:
   - Assess breakout risk
   - Consider grid adjustment or closure
   \`\`\`

   **Order Status Review:**
   - Which orders filled overnight?
   - Current inventory position (long/short/neutral)
   - Profit captured so far
   - Orders needing replacement

   **Example Daily Log:**
   \`\`\`
   Date: January 15, 2025
   
   Overnight Activity:
   - $98.40 buy filled (price dropped to $98.20)
   - $101.60 sell filled (price spiked to $102.10)
   - Net: Bought 1 unit, Sold 1 unit (balanced)
   - Profit: $3.20 per unit = $3.20 (0.032%)
   
   Current Inventory:
   - Started: 5 units SOL
   - Current: 5 units SOL (neutral position maintained)
   
   Replacement Orders:
   - Place new buy at $98.40
   - Place new sell at $101.60
   
   Kairos Check:
   - No new aggressive single-direction discoveries
   - Range still valid
   - Continue grid
   \`\`\`

6. **Weekly Deep Review (30 minutes):**

   **Performance Analysis:**
   \`\`\`
   Week of January 13-19, 2025
   
   Grid Performance:
   - Fills: 14 buy orders, 12 sell orders
   - Gross Profit: $156.80
   - Trading Fees: $23.50 (0.15% per trade)
   - Net Profit: $133.30 (1.33% on $10,000 capital)
   - Weekly ROI: 1.33%
   - Annualized: ~69% (if maintained, unlikely)
   
   Grid Health:
   - Inventory drift: Holding 7 units (started with 5)
   - Reason: More buys than sells (price trending down)
   - Action: Monitor, acceptable within range
   - Concern if: Inventory reaches 10+ units (too long)
   \`\`\`

   **Range Validation:**
   \`\`\`
   Check if range still holds:
   
   Price Action:
   ✓ Bounced at $92.50 (respected lower boundary)
   ✓ Rejected at $107.80 (respected upper boundary)
   ✓ Ranged 14 times between boundaries
   
   Kairos Patterns:
   ✓ Still showing both upside and downside discoveries
   ✓ No aggressive single-direction clustering
   ✓ Conservative discoveries oscillating (healthy range signal)
   
   Volume:
   ✓ Volume declining in middle of range
   ✓ Volume spikes at boundaries (rejection volume)
   
   Conclusion: Range STILL VALID, continue grid
   \`\`\`

   **Risk Assessment:**
   \`\`\`
   Breakout Risks:
   
   Upside Breakout Scenario:
   - If price breaks above $110 with volume
   - Grid would have sold positions up to $108
   - Would miss further upside
   - Could re-enter or close grid
   
   Downside Breakout Scenario:
   - If price breaks below $88 with volume
   - Grid would have bought down to $92
   - Would be holding at loss
   - Stop-loss at $85? (>20% range break)
   
   Kairos Early Warning:
   - Multiple aggressive upside only = Upside breakout risk
   - Multiple aggressive downside only = Downside breakout risk
   - Current: Still showing both = Range continuation likely
   \`\`\`

7. **Breakout Detection and Response:**

   **Kairos Signals for Breakout:**
   \`\`\`
   Week 4: Sudden Pattern Change
   
   Kairos Now Shows:
   - 3x Aggressive upside discoveries (all profiles)
   - 1x Conservative downside (weak)
   - No aggressive downside
   
   Interpretation:
   - Pattern convergence suggesting upside breakout
   - Downside discoveries diminishing
   - Range potentially ending
   
   Action Required: Assess breakout probability
   \`\`\`

   **Breakout Confirmation:**
   \`\`\`
   Technical Confirmation:
   ✓ Price at $109 (above upper boundary)
   ✓ Volume 3x average (strong breakout volume)
   ✓ Clean break, no immediate rejection
   ✓ Kairos patterns aligned upside
   
   Fundamental Check:
   ✓ Major partnership announcement (catalyst)
   ✓ Sector strength (broader context)
   
   Decision: BREAKOUT CONFIRMED
   \`\`\`

   **Grid Closure Process:**
   \`\`\`
   1. Cancel all remaining orders
   2. Assess current inventory:
      - Holding: 7 units SOL (from grid buys)
      - Current price: $112
      - Avg cost: $96.80 (from grid buys)
      - Unrealized profit: $106.40 (15.7%)
   
   3. Exit decision:
      Option A: Close entire grid, liquidate inventory
      - Sell 7 units at $112
      - Realize profit: $106.40
      - Total grid profit: $133.30 (range profits) + $106.40 (inventory) = $239.70
      - Total ROI: 2.4% over 4 weeks
      
      Option B: Keep inventory, ride breakout
      - Close grid (no more range trading)
      - Hold 7 units as position trade
      - Manage with stops and targets
      - Grid profit realized: $133.30
      - Inventory becomes separate trade
   
   Decision: Option B (thesis suggests breakout sustainable)
   - Close grid, realize $133.30 profit
   - Convert inventory to position trade
   - Set stop at $105 (back in range)
   - Target $125 (next resistance)
   \`\`\`

**Advanced Grid Techniques with Kairos:**

**Dynamic Grid Adjustment:**
\`\`\`
Traditional: Fixed grid parameters, no adjustment

Dynamic with Kairos:
- Expand grid if volatility increasing (wider discoveries)
- Contract grid if volatility decreasing (tighter discoveries)
- Shift grid center if range migrating (asymmetric discoveries)
- Adjust position sizing based on discovery conviction

Example:
Week 1: Range $90-$110, grid deployed
Week 2: Discoveries shift to $92-$112
Week 3: Adjust grid center up by $2
New range: $92-$112
Transition orders gradually
\`\`\`

**Multi-Timeframe Grid:**
\`\`\`
Run multiple grids on different timeframes:

Conservative Grid:
- Tight spacing ($1 between levels)
- Small positions
- High frequency
- Based on conservative discoveries

Aggressive Grid:
- Wide spacing ($5 between levels)
- Larger positions
- Low frequency
- Based on aggressive discoveries

Both run simultaneously on same asset
Different ranges, different dynamics
\`\`\`

**Key Principles for Grid Trading with Kairos:**

1. **Range validation is critical**
   - Don't deploy grids on discoveries alone
   - Validate with volume profile, market profile, technicals
   - Ensure sufficient historical range behavior
   - Risk breakout losses without validation

2. **Opposing discoveries = Range hypothesis**
   - Both upside and downside patterns
   - Balanced across timeframes
   - Neither direction dominating
   - Key signal for range-bound conditions

3. **Single-direction clustering = Breakout warning**
   - Multiple aggressive same direction
   - Opposing direction discoveries vanishing
   - Kairos early warning system
   - Close grids before major breakout losses

4. **Inventory management matters**
   - Track long/short drift
   - Rebalance if extreme (>2x starting inventory)
   - Consider inventory as separate position
   - Don't let grid become directional bet

5. **Fees and slippage matter significantly**
   - Calculate breakeven per round trip
   - Ensure range width exceeds fees significantly
   - Wider spacing if high fees
   - Monitor actual execution quality

**Common Mistakes:**

❌ Deploying grids on trending markets
❌ Ignoring breakout signals from Kairos clustering
❌ Not validating range with other analysis
❌ Over-dense grids (fees destroy profits)
❌ Ignoring inventory drift (becoming unbalanced)

✓ Waiting for clear range confirmation
✓ Monitoring Kairos for breakout warnings
✓ Multi-factor range validation
✓ Appropriate grid spacing for fees
✓ Regular inventory and performance review

---

### Use Case 6: Options Trading and Strategies

**User Profile:**
- Options traders (calls, puts, spreads)
- Volatility traders and hedgers
- Income strategies (covered calls, cash-secured puts)
- Sophisticated understanding of options mechanics
- Greeks management focus

**How Kairos Might Fit Your Workflow:**

**Critical Preface for Options Traders:**

Options require understanding of:
- Leverage (small moves = large P&L swings)
- Time decay (theta erodes value daily)
- Volatility impact (vega exposure)
- Multiple variables simultaneously (complex)

**Kairos provides directional context only. Options-specific analysis (IV, Greeks, term structure) is YOUR responsibility.**

**Options Strategy Selection with Kairos Context:**

1. **Directional Bias from Discoveries:**

   **Bullish Setup Identification:**
   \`\`\`
   Kairos Shows:
   - Conservative upside discovery on ETH/USDT
   - Entry: $2,500, T1: $2,650 (+6%)
   - Discovered 1 day ago
   - Historical: Max growth +12% (DD: -3%)
   
   Your Analysis:
   - ETH fundamentals strong (Shanghai upgrade approaching)
   - Technical: Breaking resistance with volume
   - Sentiment: Neutral to slightly bearish (contrarian positive)
   
   Directional Bias: BULLISH
   Magnitude Expectation: +6% to +12% over 2-4 weeks
   \`\`\`

   **Options Strategy Selection:**
   \`\`\`
   Given bullish bias, options include:
   
   1. Long Call (Directional, leverage)
      - Simple directional bet
      - High leverage, defined risk
      - Theta decay enemy
      - Best for strong conviction, near-term moves
   
   2. Bull Call Spread (Directional, limited risk/reward)
      - Defined risk and reward
      - Lower cost than naked call
      - Less theta exposure
      - Best for moderate conviction, capped upside acceptable
   
   3. Cash-Secured Put (Income, acquire if assigned)
      - Collect premium, potentially acquire ETH cheaper
      - Bullish (want to own ETH)
      - Theta decay friend
      - Best for long-term bullish, willing to own
   
   4. Call Butterfly (Neutral-Bullish, range-bound)
      - Profit if price lands in specific range
      - Low cost, limited risk/reward
      - Complex setup
      - Best if expecting consolidation in target zone
   \`\`\`

2. **Strike Selection Using Kairos Targets:**

   **Example: Bull Call Spread on ETH**
   \`\`\`
   Kairos Discovery:
   - Current: $2,500
   - T1: $2,650 (+6%)
   - T2: $2,750 (+10%)
   
   Your Options Analysis:
   - IV Percentile: 35% (moderate, not extreme)
   - 30 days to expiration available
   - Expecting move within 20-30 days
   
   Bull Call Spread Structure:
   Buy: $2,550 Call (slightly OTM, delta ~0.45)
   Sell: $2,700 Call (near T1, delta ~0.25)
   
   Rationale:
   - Buy strike: Near current price, good delta
   - Sell strike: Near T1 target ($2,650), caps upside just past target
   - Width: $150 between strikes
   - Cost: ~$60 debit (hypothetical)
   - Max Profit: $90 ($150 - $60)
   - Max Loss: $60 (debit paid)
   - Breakeven: $2,610
   
   Risk/Reward: 1.5:1 ($90 profit vs $60 risk)
   
   Alignment with Kairos:
   - Strikes bracket T1 target
   - Not overextending to T2
   - Conservative take-profit relative to discovery
   - Time horizon matches expected pattern resolution
   \`\`\`

   **Strike Selection Principles:**
   \`\`\`
   Conservative Approach:
   - Buy ATM or slightly ITM (higher delta)
   - Sell at or before T1 (first target)
   - Don't reach for T2 or T3 (too greedy)
   - Shorter expiration (less theta cost)
   
   Aggressive Approach:
   - Buy OTM (lower cost, lower delta)
   - Sell at T2 or T3 (higher upside)
   - Longer expiration (more time for development)
   - Higher risk/reward
   
   Kairos targets are REFERENCES, not automatic strike selection.
   Your IV analysis, delta preferences, and risk tolerance drive strikes.
   \`\`\`

3. **Volatility Analysis Integration:**

   **IV Percentile Context:**
   \`\`\`
   Before using Kairos discovery for options:
   
   Check Implied Volatility:
   - IV Rank or IV Percentile
   - Where is current IV vs historical?
   - Are options expensive or cheap?
   
   Example:
   ETH Options IV Percentile: 75% (expensive)
   - Current IV: 60%
   - Historical range: 30%-80%
   - Currently in 75th percentile (near highs)
   
   Interpretation:
   - Options are expensive (high premium)
   - Selling premium strategies favored
   - Buying options requires strong conviction
   
   Adjustment to Strategy:
   - Instead of buying calls (expensive)
   - Consider selling puts (collect expensive premium)
   - Or bull put spread (defined risk premium selling)
   - Or wait for IV to decline
   \`\`\`

   **Kairos Pattern + IV Context:**
   \`\`\`
   Scenario A: Upside Discovery + High IV
   - Discovery suggests bullish move
   - Options are expensive
   - Strategy: Sell put spread (collect premium, defined risk)
   - Or: Buy call spread (cheaper than naked calls)
   
   Scenario B: Upside Discovery + Low IV
   - Discovery suggests bullish move
   - Options are cheap
   - Strategy: Buy calls (leverage, cheap cost)
   - Or: Long call calendar (cheap long-term calls)
   
   Scenario C: Risk Alert + High IV
   - Discovery suggests bearish move
   - Options are expensive
   - Strategy: Sell call spread (collect premium, limited risk)
   - Or: Buy put spread (defined risk, not overpaying)
   
   Scenario D: Risk Alert + Low IV
   - Discovery suggests bearish move
   - Options are cheap
   - Strategy: Buy puts (leverage, cheap protection)
   - Or: Protective puts on holdings (cheap insurance)
   \`\`\`

4. **Example Trade Workflow:**

   **Setup:**
   \`\`\`
   Date: January 15, 2025
   
   Kairos Discovery:
   - Asset: BTC/USDT
   - Pattern: Conservative downside alert
   - Current: $42,000
   - R1: $40,000 (-4.8%)
   - R2: $38,500 (-8.3%)
   - Historical PR: +2.5% (expects bounce during decline)
   
   Your Context:
   - Hold 1 BTC in spot portfolio
   - Concerned about short-term weakness
   - Don't want to sell spot (long-term bullish)
   - BTC options IV: 45% (IV Percentile: 55% - moderate)
   
   Decision: Hedge with protective put
   \`\`\`

   **Options Analysis:**
   \`\`\`
   BTC Options Chain (30 days to expiration):
   
   Put Options:
   - $42,000 Put (ATM): $1,800 premium (4.3% of BTC price)
   - $40,000 Put (OTM): $900 premium (2.1% of BTC price)
   - $38,000 Put (OTM): $400 premium (1.0% of BTC price)
   
   Strike Selection Thinking:
   
   $42,000 Put (ATM):
   - Immediate protection
   - Expensive (4.3% of position)
   - Over-insured given conservative alert
   
   $40,000 Put (Near R1):
   - Protection near Kairos R1 target
   - Moderate cost (2.1% of position)
   - Allows for -4.8% drawdown (acceptable)
   - Reasonable hedge cost
   
   $38,000 Put (Below R2):
   - Cheapest protection
   - Allows large drawdown (-9.5%)
   - Under-insured given risk alert
   
   Selection: $40,000 Put
   - Aligns with Kairos R1 level
   - Balanced cost/protection
   - Acceptable drawdown tolerance
   \`\`\`

   **Trade Execution:**
   \`\`\`
   Trade Details:
   - Buy 1x BTC $40,000 Put
   - Expiration: 30 days
   - Premium: $900 (2.1% hedge cost)
   
   Protection Profile:
   - BTC can drop to $40,000 with limited loss
   - Below $40,000: Protected (put gains offset BTC loss)
   - Above $40,000: Spot gains minus put premium
   - Breakeven: $40,900 (accounting for put cost)
   
   Hedge cost: $900 (2.1% of $42,000)
   Maximum loss: $2,900 ($42,000 - $40,000 + $900 premium)
   = 6.9% max loss on spot position
   \`\`\`

   **Ongoing Management:**
   \`\`\`
   Week 1:
   - BTC drops to $41,000 (-2.4%)
   - Put now worth $1,200 (+$300)
   - Spot loss: -$1,000
   - Net position: -$700
   - Kairos: Pattern progressing toward R1
   
   Decision: Hold hedge, pattern developing as expected
   
   Week 2:
   - BTC drops to $39,500 (-6.0%, below R1)
   - Put now worth $2,700 (+$1,800)
   - Spot loss: -$2,500
   - Net position: -$700 (limited by hedge)
   - Kairos: R1 hit, historical PR suggests bounce
   
   Decision: Close put for profit, remove hedge
   - Sell put for $2,700
   - Net hedge P&L: +$1,800
   - Spot unrealized loss: -$2,500
   - Combined: -$700 (6.9% max loss achieved as designed)
   - Hold spot (long-term bullish thesis intact)
   
   Week 3:
   - BTC bounces to $41,000 (Kairos PR behavior)
   - Spot recovers: -$1,000 (from peak)
   - Hedge closed: +$1,800 (locked in)
   - Net: +$800 (1.9% overall)
   
   Outcome:
   - Hedge worked as designed
   - Limited downside exposure
   - Profited from put during decline
   - Maintained spot for recovery
   - Kairos risk alert provided timely context
   \`\`\`

5. **Income Strategies with Kairos:**

   **Covered Call Writing:**
   \`\`\`
   Situation:
   - Hold 10 ETH at $2,500 avg cost
   - Kairos: No strong upside discoveries (neutral/consolidation)
   - Conservative downside alert (mild weakness)
   
   Strategy: Write covered calls to generate income
   
   Options Analysis:
   - ETH $2,650 Call (30 days): $80 premium (3.2% yield)
   - Strike aligns with previous Kairos T1 (resistance zone)
   - IV Percentile: 60% (moderately expensive premiums)
   
   Trade:
   - Sell 10x ETH $2,650 Calls
   - Collect: $800 total premium (3.2% on $25,000)
   - Obligation: Sell ETH at $2,650 if exercised
   
   Outcomes:
   
   ETH stays below $2,650:
   - Keep premium: +$800 (3.2%)
   - Keep ETH
   - Repeat next month
   
   ETH goes above $2,650:
   - Sell ETH at $2,650 (obligated)
   - Profit: $1,500 (appreciation) + $800 (premium) = $2,300 (9.2%)
   - Exit position (can repurchase lower or move to new asset)
   
   Risk:
   - Caps upside at $2,650
   - Miss gains above that
   - Still exposed to downside (minus premium)
   
   Kairos Context:
   - Lack of upside discoveries suggests limited upside (good for covered calls)
   - Downside alert suggests risk (covered call doesn't protect fully)
   - Consider protective put if downside concern high
   \`\`\`

6. **Complex Multi-Leg Strategies:**

   **Iron Condor (Range-Bound Strategy):**
   \`\`\`
   Kairos Pattern:
   - Both upside and downside discoveries (range-bound signal)
   - Conservative upside T1: $2,650
   - Conservative downside R1: $2,350
   - Current: $2,500
   - Range: $2,350 - $2,650 (±6%)
   
   Strategy: Iron Condor (profit if stays in range)
   
   Structure (30 days):
   - Sell $2,600 Call (delta ~0.25)
   - Buy $2,650 Call (delta ~0.15)
   - Sell $2,400 Put (delta ~-0.25)
   - Buy $2,350 Put (delta ~-0.15)
   
   Premium Collected: $120 (net credit)
   Max Profit: $120 (if price stays between $2,400-$2,600)
   Max Loss: $430 (if breaches either side fully)
   Breakevens: $2,280 and $2,720
   
   Alignment with Kairos:
   - Wings placed near discovered boundaries
   - Profit zone matches expected range
   - Defined risk if range breaks
   
   Management:
   - Close early if 50%+ profit captured
   - Adjust if Kairos shows single-direction clustering (breakout warning)
   - Monitor Greeks daily (theta friend, vega enemy if IV spikes)
   \`\`\`

**Key Principles for Options Trading with Kairos:**

1. **Kairos provides directional bias, not options strategy**
   - Pattern suggests up/down/range
   - YOU select appropriate options strategy
   - IV analysis critical (options pricing)
   - Greeks management YOUR responsibility

2. **Targets are strike selection references**
   - T1/R1 useful for strike selection
   - Don't automatically use as strikes
   - Consider IV, delta, your risk tolerance
   - Conservative strike selection often better

3. **Time decay matters more than pattern timing**
   - Options expire (patterns don't have hard deadlines)
   - Give pattern time to develop (longer expiration)
   - Theta decay accelerates near expiration
   - Historical pattern duration informs expiration selection

4. **Volatility analysis supersedes pattern analysis**
   - If IV extremely high: Sell premium strategies
   - If IV extremely low: Buy options strategies
   - Pattern is one input among many
   - Options pricing mechanics can override

directional view

5. **Risk management is amplified**
   - Options leverage works both ways
   - Define maximum loss before entry
   - Position size conservatively (options can go to zero)
   - Don't risk more than you'd risk on spot position

**Common Mistakes:**

❌ Selecting strikes solely based on Kairos targets
❌ Ignoring IV context (buying expensive options)
❌ Using short-dated options on longer-term patterns
❌ Over-leveraging because "discovery is strong"
❌ Not managing Greeks (especially vega and theta)

✓ Integrating Kairos with full options analysis
✓ Checking IV before every options trade
✓ Matching expiration to expected pattern timeframe
✓ Conservative position sizing with leverage
✓ Daily Greeks monitoring and adjustment

---

### Use Case 7: Hedging and Risk Management

**User Profile:**
- Portfolio risk managers
- Institutional or sophisticated individual investors
- Multi-position holders
- Downside protection focused
- Insurance-like approach to risk

**How Kairos Might Fit Your Workflow:**

**Portfolio-Level Risk Monitoring:**

1. **Daily Risk Alert Scan (10 minutes):**

   **Morning Routine:**
   \`\`\`
   Open Kairos, filter to your portfolio holdings only:
   
   Portfolio (10 positions):
   - BTC: 40% allocation
   - ETH: 25% allocation
   - AVAX: 8% allocation
   - MATIC: 6% allocation
   - ATOM: 5% allocation
   - LINK: 5% allocation
   - DOT: 4% allocation
   - FTM: 3% allocation
   - NEAR: 2% allocation
   - SOL: 2% allocation
   
   Risk Alert Scan Results:
   Holdings with Risk Alerts:
   1. AVAX: Aggressive downside (discovered 2 days ago)
   2. DOT: Moderate downside (discovered today)
   3. FTM: Conservative downside (discovered yesterday)
   
   Holdings without Risk Alerts:
   - BTC, ETH, MATIC, ATOM, LINK, NEAR, SOL: No alerts
   
   Clustering Analysis:
   - 3 of 10 holdings flagged (30%)
   - All three are mid-cap alts
   - No alerts on BTC/ETH (major holdings)
   - Signals: Mid-cap weakness, but not systemic
   \`\`\`

2. **Risk Severity Assessment:**

   **For each alert, assess severity:**

   **AVAX - Aggressive Downside:**
   \`\`\`
   Kairos Data:
   - Alert trigger: $35.50
   - Current: $34.80 (-2.0%)
   - R1: $32.00 (-9.9%)
   - R2: $29.50 (-16.9%)
   - Historical: Max loss -12% (PR: +3%)
   
   Your Position:
   - Holdings: 225 AVAX ($7,830 at current price)
   - Cost basis: $32.00 (currently +8.8%)
   - Portfolio allocation: 7.8% (slightly below 8% target)
   
   Fundamental Check:
   - Q: Recent negative news? A: Competitor launched similar feature
   - Q: Thesis deteriorating? A: Partially (competitive pressure)
   - Q: Permanent or temporary? A: Uncertain
   
   Severity: MODERATE to HIGH
   - Aggressive profile (significant pattern)
   - Fundamental concerns present
   - Portfolio allocation material (8%)
   - Action: Consider partial hedge or reduction
   \`\`\`

   **DOT - Moderate Downside:**
   \`\`\`
   Kairos Data:
   - Alert trigger: $6.80
   - Current: $6.75 (-0.7%)
   - R1: $6.20 (-8.8%)
   - R2: $5.70 (-16.2%)
   - Historical: Max loss -10% (PR: +2%)
   
   Your Position:
   - Holdings: 590 DOT ($3,983 at current price)
   - Cost basis: $5.50 (currently +22.7%)
   - Portfolio allocation: 4.0% (target 4%)
   
   Fundamental Check:
   - Q: Recent negative news? A: Parachain activity declining
   - Q: Thesis deteriorating? A: Yes, adoption slower than expected
   - Q: Permanent or temporary? A: Trend, not event
   
   Severity: MODERATE
   - Moderate profile (medium significance)
   - Fundamental thesis weakening (long-term concern)
   - Smaller allocation (4%)
   - Action: Monitor closely, possible reduction
   \`\`\`

   **FTM - Conservative Downside:**
   \`\`\`
   Kairos Data:
   - Alert trigger: $0.48
   - Current: $0.47 (-2.1%)
   - R1: $0.45 (-6.3%)
   - Historical: Max loss -4% (PR: +1.5%)
   
   Your Position:
   - Holdings: 6,383 FTM ($3,000 at current price)
   - Cost basis: $0.40 (currently +17.5%)
   - Portfolio allocation: 3.0% (target 3%)
   
   Fundamental Check:
   - Q: Recent negative news? A: None specific
   - Q: Thesis deteriorating? A: No, intact
   - Q: Permanent or temporary? A: Likely temporary technical
   
   Severity: LOW
   - Conservative profile (minor pattern)
   - Fundamentals intact
   - Small allocation (3%)
   - Action: Monitor, no immediate action
   \`\`\`

3. **Hedging Decision Framework:**

   **Decision Matrix:**
   \`\`\`
   For each position with risk alert:
   
   HIGH SEVERITY → Take Action
   - Aggressive downside + fundamental concern
   - Large portfolio allocation
   - Pattern aligns with thesis deterioration
   
   Actions:
   1. Partial exit (reduce position 25-50%)
   2. Full hedge (protective puts, inverse positions)
   3. Full exit (if thesis invalidated)
   
   MODERATE SEVERITY → Consider Action
   - Moderate downside or mixed signals
   - Medium portfolio allocation
   - Uncertain fundamental outlook
   
   Actions:
   1. Partial hedge (protect 30-50% of position)
   2. Tighten stops (protect downside)
   3. Reduce position slightly (take some profits)
   
   LOW SEVERITY → Monitor
   - Conservative downside
   - Small allocation
   - Fundamentals intact
   
   Actions:
   1. Watch for escalation (moderate/aggressive alerts)
   2. Update stop-loss (don't leave stale stops)
   3. No immediate action (stay patient)
   \`\`\`

4. **Example Hedging Execution:**

   **AVAX Position (High Severity):**
   \`\`\`
   Decision: Partial hedge with protective put
   
   Position: 225 AVAX at $34.80 = $7,830
   Hedge: 50% of position = 112.5 AVAX equivalent
   
   Options Analysis:
   - AVAX $32 Put (30 days): $1.20 premium
   - Strike aligns with Kairos R1
   - Allows -8% drawdown (acceptable)
   - Cost: $135 total (1.7% of hedged amount)
   
   Trade:
   - Buy protective puts covering 50% of position
   - If AVAX drops below $32, puts offset losses on 50%
   - Other 50% unhedged (maintain upside exposure)
   
   Rationale:
   - Don't want full exit (not ready to abandon position)
   - Fundamental concerns merit protection
   - Partial hedge balances protection and participation
   - Cost reasonable for peace of mind
   \`\`\`

   **DOT Position (Moderate Severity):**
   \`\`\`
   Decision: Partial position reduction
   
   Position: 590 DOT at $6.75 = $3,983
   Reduction: 30% = 177 DOT
   
   Trade:
   - Sell 177 DOT at market
   - Proceeds: ~$1,195
   - Remaining: 413 DOT ($2,788)
   - New allocation: 2.8% (reduced from 4.0%)
   
   Rationale:
   - Fundamental thesis weakening (not invalidated)
   - Take profits while ahead (+22.7%)
   - Reduce exposure preemptively
   - Maintain position in case thesis wrong
   - Can re-enter if outlook improves
   \`\`\`

   **FTM Position (Low Severity):**
   \`\`\`
   Decision: No action, monitoring
   
   Position: 6,383 FTM at $0.47 = $3,000
   Action: None immediate
   
   Monitoring Plan:
   - Watch for moderate/aggressive downside alerts
   - Check if fundamentals deteriorate
   - Update mental stop-loss from $0.38 to $0.42 (tighter)
   - Review again in 1 week
   
   Rationale:
   - Conservative pattern (low significance)
   - Fundamentals intact
   - Small allocation (low portfolio impact)
   - Premature to act on minor signal
   \`\`\`

5. **Portfolio-Level Risk Assessment:**

   **Correlation Analysis:**
   \`\`\`
   Risk Alerts Clustering Check:
   
   Current Situation:
   - 3 of 10 holdings with risk alerts (30%)
   - All three are mid-cap alts (AVAX, DOT, FTM)
   - Zero alerts on BTC/ETH (60% of portfolio)
   
   Correlation Insight:
   - NOT systematic risk (BTC/ETH would be flagged)
   - Idiosyncratic risk (specific to mid-cap alts)
   - Possible sector rotation (away from alts toward majors)
   
   Portfolio Action:
   - NOT reducing overall crypto exposure
   - Reducing mid-cap alt exposure specifically
   - Rebalancing toward BTC/ETH (showing relative strength)
   \`\`\`

   **Systemic Risk Example:**
   \`\`\`
   Hypothetical: What if alerts clustered differently?
   
   If alerts were:
   - BTC: Aggressive downside
   - ETH: Aggressive downside
   - AVAX: Aggressive downside
   - MATIC: Aggressive downside
   - ATOM: Moderate downside
   - 5 of 10 holdings, INCLUDING majors
   
   This indicates:
   - SYSTEMIC risk (broad market weakness)
   - Not idiosyncratic
   - Possible macro event or regime change
   
   Portfolio Action:
   - Reduce overall crypto exposure 20-40%
   - Increase cash allocation
   - Portfolio-level hedge (inverse ETFs, put options on BTC)
   - Fundamental reassessment of crypto thesis
   \`\`\`

6. **Weekly Portfolio Risk Review:**

   \`\`\`
   Week of January 13-19, 2025
   
   Risk Alert Evolution:
   
   Start of Week:
   - AVAX: Aggressive downside
   - DOT: Moderate downside
   - FTM: Conservative downside
   
   Actions Taken:
   - AVAX: Hedged 50% with protective puts
   - DOT: Reduced position by 30%
   - FTM: Monitoring, no action
   
   End of Week:
   - AVAX: R1 hit at $32.10, pattern continuing
     - Put hedge profitable (+$180)
     - Unhedged portion down (-$315)
     - Net: -$135 (limited loss, hedge working)
   
   - DOT: Continued decline to $6.20
     - Sold 30% at $6.75
     - Remaining 70% now at $6.20 (-8.1%)
     - Net: Avoided $168 loss on sold portion
   
   - FTM: Recovered to $0.49 (+4.3%)
     - Monitoring decision correct
     - No hedge cost, captured recovery
   
   New Risk Alerts:
   - MATIC: Conservative downside emerged
   - LINK: Moderate downside emerged
   
   Interpretation:
   - Mid-cap alt weakness spreading (now 5 of 10 with alerts)
   - Approaching systemic concern threshold
   - Consider broader portfolio de-risking
   
   Next Week Action Plan:
   - Review MATIC and LINK fundamentals
   - If deteriorating, reduce allocation
   - If cluster grows to 6+, reduce overall exposure
   - Close AVAX hedge if pattern resolves (lock profit)
   \`\`\`

7. **Hedge Exit and Profit Realization:**

   **AVAX Hedge Exit:**
   \`\`\`
   Week 2: AVAX Pattern Resolution
   
   Kairos Update:
   - AVAX hit R1 ($32), bounced to $33.50 (PR behavior)
   - Conservative upside discovery emerged (reversal signal)
   - Pattern likely resolving
   
   Hedge Position:
   - Protective puts now profitable (+$250)
   - Spot position recovered slightly
   
   Decision: Close hedge, lock profit
   - Sell puts for $250 profit
   - Remove hedge (no longer needed)
   - Hold spot (thesis partially recovered)
   
   Outcome:
   - Hedge protected during decline
   - Locked profit from hedge
   - Maintained spot for recovery
   - Total protection cost: Negative (hedge profitable)
   - Risk management: Excellent outcome
   \`\`\`

**Advanced Hedging Strategies:**

**Dynamic Hedging:**
\`\`\`
Adjust hedge ratio based on risk alert severity:

Portfolio: $100,000
Conservative downside: 10% hedge ratio
Moderate downside: 30% hedge ratio
Aggressive downside: 50% hedge ratio

AVAX Position: $8,000 (8% of portfolio)
Aggressive downside alert

Hedge Calculation:
$8,000 * 50% = $4,000 worth of protection
Implementation: Protective puts, inverse position, or short futures
\`\`\`

**Portfolio-Level Hedging:**
\`\`\`
Instead of hedging each position:

Portfolio: $100,000 crypto
Composition: 40% BTC, 30% ETH, 30% alts

Risk Alert Cluster: 6 of 10 holdings

Portfolio Hedge Options:
1. BTC Inverse ETF or short futures (proxy hedge)
2. Buy BTC/ETH put options (protect large holdings)
3. Reduce portfolio to 60% crypto, 40% cash

Choose based on:
- Hedge cost vs risk magnitude
- Duration of expected weakness
- Tax implications of selling
- Conviction in individual holdings
\`\`\`

**Key Principles for Hedging with Kairos:**

1. **Risk alerts are early warnings, not guarantees**
   - Pattern suggests elevated risk
   - Doesn't guarantee decline
   - Cost of hedge vs potential loss
   - Peace of mind has value

2. **Hedge ratio proportional to severity**
   - Conservative alerts: Light hedging or monitoring
   - Moderate alerts: Partial hedging (30-50%)
   - Aggressive alerts: Substantial hedging (50%+) or exit
   - Cluster of alerts: Portfolio-level hedging

3. **Hedging is insurance, not speculation**
   - Accept hedge cost as insurance premium
   - Don't expect hedges to be profitable
   - Goal: Limit downside, not profit from decline
   - If hedge profitable, consider it bonus

4. **Exit hedges when patterns resolve**
   - Don't hold hedges indefinitely (decay/cost)
   - Conservative upside emergence = Consider hedge exit
   - Pattern resolved = Close hedge
   - Fundamentals improve = Reduce hedge

5. **Combine Kairos with fundamental analysis**
   - Risk alert + fundamental concern = Higher severity
   - Risk alert + fundamentals intact = Lower severity
   - Never hedge based on patterns alone
   - Comprehensive risk assessment required

**Common Mistakes:**

❌ Over-hedging (hedging every minor alert)
❌ Under-hedging (ignoring severe clusters)
❌ Holding hedges too long (paying unnecessary costs)
❌ Hedging without fundamental analysis
❌ Using hedges as directional bets

✓ Proportional hedging based on severity
✓ Portfolio-level risk monitoring
✓ Exiting hedges when patterns resolve
✓ Integrating fundamental and technical risk
✓ Accepting hedge costs as insurance


### Use Case 10: Risk Management Framework Enhancement

**User Profile:**
- Portfolio risk managers
- Multi-position traders
- Institutional or sophisticated investors
- Risk-first approach to markets
- Systematic risk monitoring

**How Kairos Might Fit Your Workflow:**

**Building a Systematic Risk Management Process:**

1. **Risk Monitoring Dashboard Creation:**

   **Daily Risk Scorecard:**
   \`\`\`
   Portfolio Overview:
   Total Value: $250,000
   Number of Positions: 12
   Target Max Drawdown: -15%
   Current Drawdown from Peak: -3.2%
   
   Risk Budget:
   - Available: 11.8% (before hitting max drawdown limit)
   - Allocated: 3.2% (current drawdown)
   - Reserved: 15% (total risk budget)
   
   Kairos Risk Alert Summary (Daily Check):
   Date: January 15, 2025
   
   Position Risk Alerts:
   Positions with Alerts: 4 of 12 (33%)
   
   Alert Severity Breakdown:
   - Critical (Aggressive downside + fundamental concern): 1 position
   - High (Aggressive downside OR moderate + fundamentals): 2 positions
   - Medium (Moderate downside, fundamentals intact): 1 position
   - Low (Conservative downside): 0 positions
   
   Portfolio-Level Indicators:
   - Alert clustering: 33% (moderate level)
   - Major holdings affected: No (BTC/ETH clean)
   - Sector concentration: Yes (3 of 4 alerts in DeFi sector)
   - Correlation concern: Low (alerts not on correlated assets)
   
   Risk Score: 4/10 (monitoring required, not urgent)
   \`\`\`

2. **Position-Level Risk Assessment Framework:**

   **Systematic Scoring Matrix:**
   \`\`\`
   For each position, calculate Risk Score (0-10):
   
   Factor 1: Kairos Alert Severity (0-3 points)
   - No alert: 0 points
   - Conservative downside: 1 point
   - Moderate downside: 2 points
   - Aggressive downside: 3 points
   
   Factor 2: Portfolio Allocation (0-3 points)
   - <2% of portfolio: 0 points
   - 2-5% of portfolio: 1 point
   - 5-10% of portfolio: 2 points
   - >10% of portfolio: 3 points
   
   Factor 3: Fundamental Outlook (0-2 points)
   - Thesis strengthening: 0 points
   - Thesis neutral/unchanged: 1 point
   - Thesis deteriorating: 2 points
   
   Factor 4: Technical Structure (0-2 points)
   - Above key support, uptrend intact: 0 points
   - Near support, trend weakening: 1 point
   - Below support, downtrend: 2 points
   
   Total Risk Score: 0-10
   - 0-2: Low risk (monitor only)
   - 3-5: Moderate risk (consider action)
   - 6-8: High risk (take action)
   - 9-10: Critical risk (immediate action)
   
   Example: AVAX Position Assessment
   
   Factor 1 (Kairos): Aggressive downside = 3 points
   Factor 2 (Allocation): 8% of portfolio = 2 points
   Factor 3 (Fundamentals): Competitor pressure = 2 points
   Factor 4 (Technical): Below 50-day MA = 1 point
   
   Total Risk Score: 8/10 (HIGH RISK - Action Required)
   
   Recommended Actions:
   - Reduce position by 50% (from 8% to 4%)
   - Or hedge 60% of position with protective puts
   - Or tighten stop-loss from -10% to -5%
   - Review decision in 3 days
   \`\`\`

3. **Risk Response Protocols:**

   **Pre-Defined Action Plans:**
   \`\`\`
   Protocol A: Single Position Risk (Score 6-8)
   
   Step 1: Validate Risk (15 minutes)
   - Confirm Kairos alert still active
   - Check for recent news/developments
   - Review fundamental thesis
   - Assess technical structure
   
   Step 2: Quantify Exposure (5 minutes)
   - Current position size
   - Unrealized P&L
   - Portfolio allocation %
   - Correlation with other positions
   
   Step 3: Select Response (choose one)
   Option A: Partial Reduction
   - Sell 30-50% of position
   - Lock in profits if in the money
   - Reduce exposure, maintain participation
   - Pros: Balanced approach
   - Cons: Still exposed to further decline
   
   Option B: Protective Hedge
   - Buy protective puts (30-60% coverage)
   - Maintain full position, limit downside
   - Cost: Option premium (1-3% typically)
   - Pros: Full upside participation if wrong
   - Cons: Cost erodes returns
   
   Option C: Stop-Loss Tightening
   - Move stop from -X% to -Y% (tighter)
   - Automated exit if deteriorates further
   - Pros: Clear exit point, automatic
   - Cons: May be stopped out prematurely
   
   Step 4: Document Decision
   - Record: Date, asset, risk score, action taken
   - Rationale: Why this response was chosen
   - Review date: When to reassess
   - Success criteria: What would reverse decision
   
   Step 5: Execute
   - Place orders
   - Confirm fills
   - Update risk scorecard
   - Set calendar reminder for review
   
   ---
   
   Protocol B: Portfolio-Level Risk (Alert Clustering >50%)
   
   Triggers:
   - >50% of positions showing risk alerts
   - >30% of positions showing aggressive downside
   - Major holdings (BTC/ETH) showing risk alerts
   - Multiple alerts + negative macro news
   
   Response (Immediate):
   1. PAUSE new position entries (stop adding exposure)
   2. REDUCE overall portfolio exposure by 20-30%
      - Sell losing positions first
      - Trim winners to raise cash
      - Exit positions with highest risk scores
   3. INCREASE cash allocation to 30-40% (from typical 10-20%)
   4. HEDGE portfolio-level exposure
      - BTC inverse positions or put options
      - Reduce directional beta
   5. TIGHTEN all stop-losses by 30%
   6. DAILY review vs typical weekly review
   
   Duration:
   - Maintain defensive posture until:
     * Alert clustering drops below 30%
     * Fundamentals improve
     * Macro concerns resolve
     * Technical structure improves
   
   ---
   
   Protocol C: Critical Single Position (Score 9-10)
   
   Triggers:
   - Aggressive downside + fundamental deterioration + large allocation
   - Pattern near R2 or R3 (deep into downside)
   - Breaking major technical support
   - News/catalyst confirming downside thesis
   
   Response (Urgent):
   1. IMMEDIATE position reduction (within 24 hours)
      - Reduce by 50-100% (depending on conviction)
      - Use limit orders to minimize slippage if possible
      - Market orders if urgency requires
   2. NO HEDGE (hedging delays the inevitable)
   3. DOCUMENT lessons learned
   4. PREVENT revenge trading (don't re-enter immediately)
   5. REALLOCATE capital to lower risk opportunities
   
   Recovery Protocol:
   - Wait minimum 2 weeks before considering re-entry
   - Require fundamental thesis improvement
   - Require Kairos upside discovery emergence
   - Start with half previous position size
   \`\`\`

4. **Risk Budget Management:**

   **Portfolio Risk Budget Allocation:**
   \`\`\`
   Total Portfolio: $250,000
   Maximum Acceptable Drawdown: -15% ($37,500)
   
   Risk Budget Allocation:
   Reserved for Black Swan: 5% ($12,500)
   Available for Position Risk: 10% ($25,000)
   
   Current Risk Allocation:
   Position 1 (BTC): 30% allocation, -2% unrealized = -$1,500
   Position 2 (ETH): 20% allocation, +3% unrealized = +$1,500
   Position 3 (AVAX): 8% allocation, -5% unrealized = -$1,000
   Position 4 (MATIC): 6% allocation, -8% unrealized = -$1,200
   ...
   
   Total Current Drawdown: -$3,200 (-1.28%)
   Risk Budget Remaining: $21,800 (87% available)
   
   Risk Budget Analysis:
   - Using only 12.8% of available risk budget
   - Comfortable room for volatility
   - Can maintain or even add positions
   - NOT in defensive mode (yet)
   
   Threshold Triggers:
   - 50% risk budget used ($12,500 drawdown): Begin reducing exposure
   - 75% risk budget used ($18,750 drawdown): Aggressive reduction
   - 90% risk budget used ($22,500 drawdown): Emergency exit protocol
   - 100% risk budget used ($25,000 drawdown): Full defensive mode
   \`\`\`

   **Position Sizing Based on Risk Budget:**
   \`\`\`
   New Position Consideration: ATOM
   
   Analysis:
   - Kairos: Conservative upside discovery
   - Fundamental: Thesis positive (IBC adoption growing)
   - Technical: Breakout from consolidation
   - Decision: Take position
   
   Position Sizing Calculation:
   
   Traditional Method:
   - 3% of portfolio = $7,500 position
   - Stop-loss: -8% from entry
   - Position risk: $7,500 * 8% = $600
   
   Risk Budget Method:
   - Available risk budget: $21,800
   - Desired risk per position: 2% of available budget
   - Position risk allocation: $21,800 * 2% = $436
   - Position size: $436 / 8% = $5,450
   
   Comparison:
   - Traditional: $7,500 position, $600 risk
   - Risk Budget: $5,450 position, $436 risk
   - Difference: Risk budget method more conservative
   
   Decision: Use risk budget method ($5,450 position)
   - Ensures we don't overallocate risk budget
   - Maintains room for other opportunities
   - Accounts for current portfolio drawdown
   - More systematic than arbitrary % rules
   \`\`\`

5. **Correlation-Adjusted Risk Management:**

   **Portfolio Correlation Matrix:**
   \`\`\`
   Question: Are risk alerts on correlated positions?
   
   Correlation Check:
   Current Risk Alerts:
   1. AVAX (8% allocation, aggressive downside)
   2. DOT (4% allocation, moderate downside)
   3. MATIC (6% allocation, moderate downside)
   4. FTM (3% allocation, conservative downside)
   
   Historical Correlation (90-day):
   AVAX-DOT: 0.72 (high)
   AVAX-MATIC: 0.68 (high)
   AVAX-FTM: 0.61 (moderate-high)
   DOT-MATIC: 0.74 (high)
   DOT-FTM: 0.58 (moderate)
   MATIC-FTM: 0.65 (moderate-high)
   
   Interpretation:
   - All four positions highly correlated
   - Risk alerts clustered on correlated assets
   - Portfolio correlation risk HIGH
   - Combined allocation: 21% (substantial)
   
   Risk Implication:
   - If one continues declining, others likely follow
   - Diversification benefit limited
   - Effective concentration: ~21% in similar exposure
   - Risk score multiplier: 1.5x (due to correlation)
   
   Adjusted Risk Scores:
   - AVAX: 8 → 9 (correlation adjustment)
   - DOT: 5 → 6 (correlation adjustment)
   - MATIC: 6 → 7 (correlation adjustment)
   - FTM: 3 → 4 (correlation adjustment)
   
   Portfolio Action:
   - Reduce overall exposure to correlated cluster
   - Target: From 21% combined to 12% combined
   - Exit: Lowest conviction positions (DOT, FTM)
   - Reduce: Highest conviction position (AVAX by 50%)
   - Monitor: MATIC closely
   \`\`\`

6. **Real-Time Risk Monitoring:**

   **Automated Alert System:**
   \`\`\`
   Risk Monitoring Rules (Check Every Hour):
   
   Rule 1: New Aggressive Downside on Major Holding
   - If: BTC or ETH gets aggressive downside alert
   - Then: Send immediate notification
   - Action: Review portfolio exposure within 1 hour
   
   Rule 2: Risk Score Increase
   - If: Any position's risk score increases by 2+ points
   - Then: Send notification
   - Action: Reassess position within 4 hours
   
   Rule 3: Alert Clustering Threshold
   - If: >40% of positions show risk alerts
   - Then: Send urgent notification
   - Action: Initiate portfolio-level risk reduction
   
   Rule 4: Correlation Cluster Alert
   - If: 3+ correlated positions (>0.6 correlation) all have alerts
   - Then: Send notification
   - Action: Review correlation risk within 2 hours
   
   Rule 5: Risk Budget Threshold
   - If: Risk budget utilization >60%
   - Then: Send notification
   - Action: Review all positions, consider exits
   
   Rule 6: Critical Position Score
   - If: Any position reaches risk score 9-10
   - Then: Send urgent notification
   - Action: Execute critical position protocol immediately
   \`\`\`

7. **Weekly Risk Review Process:**

   **Systematic Weekly Review (30-45 minutes):**
   \`\`\`
   1. Portfolio Health Check (10 minutes):
      - Current total value vs. peak value
      - Drawdown from peak
      - Risk budget utilization
      - Overall positioning (% long, % cash)
   
   2. Position-by-Position Review (15 minutes):
      - Update risk score for each position
      - Note any risk score changes from last week
      - Identify positions requiring action
      - Check if previous decisions need adjustment
   
   3. Kairos Pattern Evolution (5 minutes):
      - Count current discoveries by type
      - Compare to last week (regime shift?)
      - Note any new alerts on holdings
      - Identify any alert resolutions
   
   4. Correlation Analysis (5 minutes):
      - Recalculate correlations (using recent data)
      - Identify any correlation structure changes
      - Note clustering of risk alerts
      - Assess diversification effectiveness
   
   5. Action Planning (5 minutes):
      - List specific actions for coming week
      - Set price alerts for key levels
      - Schedule position reviews
      - Update risk protocols if needed
   
   6. Documentation (5 minutes):
      - Record current portfolio state
      - Note decisions and rationale
      - Track performance of previous decisions
      - Update lessons learned
   \`\`\`

**Advanced Risk Management Techniques:**

**1. Dynamic Position Sizing:**
\`\`\`
Adjust position sizes based on market volatility and risk alert prevalence:

Low Risk Environment (Alert clustering <20%):
- Standard position sizing: 3-5% per position
- Max portfolio deployment: 80%
- Comfortable taking new positions

Moderate Risk Environment (Alert clustering 20-40%):
- Reduced position sizing: 2-3% per position
- Max portfolio deployment: 60%
- Selective on new positions

High Risk Environment (Alert clustering >40%):
- Minimal position sizing: 1-2% per position
- Max portfolio deployment: 40%
- Very selective, mostly defensive
\`\`\`

**2. Tiered Stop-Loss System:**
\`\`\`
Use multiple stop levels based on position conviction:

Tier 1 - Mental Stop (Soft):
- Alert level: Conservative downside emerges
- Action: Review position, no automatic exit
- Purpose: Early warning, time to prepare

Tier 2 - Trailing Stop (Dynamic):
- Alert level: Moderate downside emerges
- Action: Tighten stop-loss by 30%
- Purpose: Protect profits, limit losses

Tier 3 - Hard Stop (Automatic):
- Alert level: Aggressive downside + risk zone approach
- Action: Automatic exit at predetermined level
- Purpose: Capital preservation, prevent large loss
\`\`\`

**3. Scenario Analysis:**
\`\`\`
Weekly Exercise: "What if?" scenarios

Scenario 1: All risk alerts worsen simultaneously
- What would portfolio drawdown be?
- Do you have enough cash to rebalance?
- Which positions would you exit first?
- How would you prioritize?

Scenario 2: Major crypto market crash (-30% in 48 hours)
- How much would portfolio decline?
- Which positions would you definitely exit?
- At what level do you go full cash?
- What's your re-entry criteria?

Scenario 3: Flash crash on largest holding
- If BTC drops 20% in 1 hour, what happens?
- Do stop-losses trigger as planned?
- Is there liquidity to exit other positions?
- What's recovery protocol?

Purpose: Mental preparation, not paranoia
Benefit: Calm decision-making during actual stress
\`\`\`

**Key Principles for Risk Management with Kairos:**

1. **Systematic beats discretionary**
   - Pre-defined risk scores and protocols
   - Remove emotion from risk decisions
   - Consistent application across all positions
   - Document everything for review

2. **Risk alerts are data, not dictates**
   - Integrate with comprehensive risk framework
   - One input among many factors
   - Don't automatically exit on every alert
   - Context and correlation matter

3. **Portfolio view over position view**
   - Individual risk scores important
   - But portfolio-level risk more critical
   - Correlation and clustering key
   - Manage aggregate exposure

4. **Proactive over reactive**
   - Act on early warnings (conservative alerts)
   - Don't wait for crisis (aggressive alerts + losses)
   - Small adjustments better than emergency exits
   - Gradual risk reduction vs panic selling

5. **Risk budget discipline**
   - Know your maximum acceptable drawdown
   - Track utilization continuously
   - Reduce exposure as budget depletes
   - Preserve capital for opportunities

**Common Mistakes:**

❌ Ignoring early warning signs (conservative alerts)
❌ No systematic risk scoring methodology
❌ Reacting emotionally to individual alerts
❌ Not accounting for correlation risk
❌ Over-complicating risk management (analysis paralysis)

✓ Systematic risk assessment framework
✓ Early action on warning signals
✓ Portfolio-level risk monitoring
✓ Correlation-aware position management
✓ Simple, executable protocols

---

## FAQ

### General Understanding

**Q: What is Kairos in one sentence?**

A: Kairos is a market intelligence platform from Quant Labs that uses institutional-grade tick data (via Butterfly infrastructure) and non-parametric statistical models to detect patterns in cryptocurrency market microstructure, then transparently tracks how these patterns develop over time.

**Q: Is Kairos a trading bot or signal service?**

A: No. Kairos is an analytical tool that shows where statistical models detect patterns and how similar historical patterns behaved. You make all trading decisions. There is no automated trading, no signals, and no recommendations.

**Q: Do I need programming skills to use Kairos?**

A: No. The interface is designed for traders and investors without programming requirements. However, if you want to export data for custom analysis or algorithmic integration, programming skills would be helpful.

**Q: Can beginners use Kairos?**

A: Kairos is designed for users with trading experience and analytical capability. Beginners should first:
- Learn market mechanics and basic technical analysis
- Practice trading with small amounts or paper trading
- Develop risk management discipline
- Build systematic decision-making processes

Using sophisticated tools like Kairos without foundational knowledge is risky.

**Q: What cryptocurrencies does Kairos cover?**

A: Kairos covers major cryptocurrencies and many altcoins with sufficient historical data and trading volume on supported exchanges. Coverage includes BTC, ETH, and hundreds of altcoins. Check the asset selector in the application for complete current list.

**Q: Does Kairos work for stocks, forex, or commodities?**

A: Currently, Kairos is focused exclusively on cryptocurrency markets. The data infrastructure and models are specifically designed for crypto market microstructure.

---

### Using Kairos Responsibly

**Q: Can I trade based solely on Kairos discoveries?**

A: You can, but you shouldn't. Discoveries show statistical patterns detected by models, not comprehensive trading recommendations. You must:
- Conduct fundamental analysis
- Consider macroeconomic context
- Assess liquidity and market conditions
- Apply your own risk management
- Make independent informed decisions

Trading based on any single input alone is poor risk management.

**Q: Why doesn't Kairos show overall performance statistics?**

A: Because it would be misleading. Kairos shows how the models have detected and tracked patterns, not how YOU would perform trading them. Your outcomes depend on:
- Your entry timing (different from discovery timing)
- Your position sizing decisions
- Your exit discipline and emotional control
- Your risk management rules
- Market conditions when YOU trade
- Execution costs, slippage, and fees

Showing aggregated "strategy performance" would falsely imply you could replicate it, which is impossible.

**Q: What if I lose money using Kairos?**

A: You are solely responsible for all trading outcomes. Kairos provides pattern detection and historical context, not financial advice or guaranteed results. Like any tool, it can be misused. Use Kairos as ONE input within a comprehensive analytical framework, never as your sole decision-making basis.

**Q: Can Kairos guarantee profits?**

A: No. Absolutely not. No tool, system, or strategy can guarantee profits in trading. All trading involves substantial risk of loss. Past pattern behavior does not predict future pattern behavior. Markets can and do remain irrational indefinitely. You can lose some or all of your trading capital.

**Q: How should I position size based on Kairos discoveries?**

A: Position sizing should be based on YOUR risk management rules, not pattern "strength" or "confidence." Consider:
- Maximum % of portfolio you'll risk on any position (typically 1-3%)
- Historical drawdown from Kairos data (can you tolerate that volatility?)
- Your overall portfolio allocation limits
- Correlation with existing positions
- Your emotional capacity for drawdown

Kairos historical drawdown data can inform position sizing, but YOUR rules determine actual size.

---

### Technical Questions

**Q: How often do discoveries update?**

A: Real-time. As markets move, Kairos continuously monitors microstructure and detects new patterns. When models detect patterns meeting criteria, discoveries are created and appear in the interface within seconds to 30 seconds. Existing discoveries update their progress continuously.

**Q: What's the difference between Hunter S1 and S2 (coming soon)?**

A: 
- **Hunter S1 (current)**: Static references locked at discovery moment. Targets, risk zones, and entry prices never change after creation. Maximum transparency and accountability, but doesn't adapt to changing conditions.
- **Hunter S2 (coming)**: Dynamic re-evaluation. References update as market conditions evolve. More adaptive to regime changes, but more complex performance attribution and validation.

Both have legitimate use cases. S1 prioritizes transparency; S2 prioritizes adaptation.

**Q: Can I backtest my strategy against Kairos data?**

A: Yes, this is a legitimate research use case. Historical discovery data can inform strategy development and validation. However:
- Past performance doesn't predict future results
- Use proper out-of-sample testing methodology
- Avoid overfitting to Kairos patterns specifically
- Account for realistic execution assumptions (fees, slippage)
- Never optimize solely on Kairos data then use Kairos in production (look-ahead bias)

**Q: Why did a discovery disappear?**

Discoveries leave Market Outlook view when:
- First target (T1) is hit (moves to detailed Opportunities/Risk Alerts view)
- Pattern is invalidated (risk zone touched)
- No longer meets your filter criteria
- Asset delisted or data temporarily unavailable

They don't actually disappear - they're still tracked in the detailed views.

**Q: Can I export discovery data?**

A: [Check with Kairos support for current data export or API capabilities. This would be specified in actual product documentation.]

---

### Interpreting Results

**Q: A discovery hit T1 with +15% gain, but I only got +5%. Why?**

A: Completely normal. The +15% is measured from discovery price at detection moment. Your results differ because:
- You likely entered after discovery (later price)
- Your execution had slippage (didn't get perfect fill)
- You paid fees and spread costs
- You may have exited before the exact high
- Discovery tracking is from discovery entry, not YOUR entry

This illustrates why you can't replicate model statistics. Timing matters enormously.

**Q: Why did an aggressive discovery resolve faster than a conservative one?**

A: Risk profiles describe model parameters (timeframe, criteria thresholds), not deterministic speed. Any profile can resolve quickly or slowly. There's statistical tendency (aggressive typically takes longer) but no mechanical relationship. Market chaos means patterns resolve unpredictably regardless of profile.

**Q: Should I use the risk zone as my stop-loss?**

A: The risk zone is ONE input for stop-loss analysis, not an automatic recommendation. Your stop-loss should consider:
- Risk zone level (pattern invalidation reference)
- Your position sizing (% portfolio risk limits)
- Technical structure (support levels, volume nodes)
- Your strategy rules (trend-following vs mean reversion)
- Your risk tolerance and emotional capacity
- Correlation with other positions

Use the risk zone as context, not prescription.

**Q: Market Outlook shows an asset ranked #1, but it hasn't moved. Is something wrong?**

A: No. Rankings show "remaining potential to T1" based on historical similar patterns. This is analytical context, not prediction or urgency signal. Markets can:
- Consolidate instead of moving immediately
- Take longer than historical average
- Move in unexpected directions
- Invalidate the pattern entirely

Rankings help you prioritize what to research deeper, not what to trade immediately.

**Q: What if metrics show very low historical performance?**

Example: Max growth +2%, drawdown -1%

This suggests:
- Historically weak pattern development
- Tight ranges, minimal volatility
- Low risk but also low reward
- May not be worth transaction costs

Consider:
- Is risk/reward attractive after fees?
- Why is historical performance modest?
- Is current market regime different?
- Are there better opportunities elsewhere?

Not every discovery warrants action.

---

### Risk Management

**Q: What if multiple positions hit risk zones simultaneously?**

This indicates portfolio-level risk manifestation. Your response:

1. **Assess**: Is this systemic (market-wide) or idiosyncratic (position-specific)?
2. **Review**: Is correlation structure breaking down under stress?
3. **Check**: Are there macro events causing broad decline?
4. **Decide**: Do you need portfolio-level risk reduction?
5. **Execute**: Follow your pre-defined risk management protocol

Clustered risk zone touches suggest reviewing overall exposure, not just individual positions.

**Q: Should I hedge every risk alert?**

No. Hedging has costs and isn't always necessary. Consider:
- Alert severity (conservative vs aggressive)
- Position size (material allocation?)
- Fundamental thesis (still intact?)
- Hedge cost vs potential loss
- Your overall portfolio risk budget

Hedge when: Severe pattern + deteriorating fundamentals + large allocation
Monitor when: Mild pattern + intact fundamentals + small allocation

**Q: How do I know when to exit a position?**

Exit criteria should be defined BEFORE entry:

**Price-based exits:**
- Stop-loss hit (predetermined level, respecting risk zone context)
- Profit targets reached (systematic profit-taking)

**Thesis-based exits:**
- Fundamental thesis invalidated
- New information contradicts original analysis
- Competitive dynamics shift unfavorably

**Pattern-based exits:**
- Risk zone touched (pattern invalidation)
- Multiple aggressive risk alerts (escalating concern)
- Pattern timeframe exceeded without progress

**Time-based exits:**
- Position held for planned duration without progress
- Opportunity cost (better opportunities emerge)

**Q: Can I use leverage with Kairos?**

Technically yes, but extreme caution required. Leverage:
- Amplifies both gains AND losses dramatically
- Increases liquidation risk significantly
- Magnifies impact of drawdowns
- Reduces margin for error to near zero
- Creates forced exit scenarios

If you use leverage:
- Understand liquidation mechanics completely
- Size positions for worst-case drawdown PLUS buffer
- Monitor risk zones obsessively
- Never use maximum available leverage
- Have de-leveraging protocols ready

Most traders should avoid leverage entirely.

---

### Troubleshooting

**Q: I don't see discoveries for my selected assets. Why?**

Possible reasons:
- No patterns currently meeting detection criteria
- Your filters too restrictive (try expanding)
- Selected assets have low liquidity (insufficient data for models)
- Assets newly listed (inadequate historical data)
- Market in low volatility regime (fewer patterns detected)

Try:
- Broadening base asset selection
- Including all risk profiles
- Waiting for market volatility to return
- Checking if assets have sufficient trading volume

**Q: Discovery counts keep changing. Is this a bug?**

No, this is normal real-time behavior. Discovery counts change because:
- New patterns detected continuously
- Discoveries move from Market Outlook to detailed views when T1 hits
- Pattern invalidations occur (risk zones touched)
- Filter changes affect what's displayed
- Real-time market evolution

This is expected in a live system.

**Q: I see different data on mobile vs desktop. Why?**

Both should show identical data. If you see discrepancies:
- Clear browser cache on both devices
- Ensure both are updated to latest version
- Check timestamps (data evolves, so timing matters)
- Verify you're using same filters on both

If persistent, contact support.

**Q: Interface seems slow or laggy. What can I do?**

Potential causes and solutions:

**Network issues:**
- Check internet connection speed (10+ Mbps recommended)
- Try wired connection vs WiFi
- Restart router

**Browser performance:**
- Use Chrome or Edge (recommended browsers)
- Close unnecessary tabs
- Clear browser cache
- Disable unnecessary extensions
- Update browser to latest version

**Display settings:**
- Reduce per-page count (25 instead of 100)
- Pause auto-update during analysis
- Use detail view instead of long list scrolling

**Device limitations:**
- Close other applications
- Restart computer
- Consider more powerful device for intensive use

---

### Advanced Topics

**Q: How do I interpret contradictory signals?**

Example: Aggressive upside + Aggressive downside on same asset

This can indicate:
- **Range-bound conditions** (potential grid trading opportunity)
- **High volatility environment** (wide swings both directions)
- **Regime transition** (market uncertain about direction)
- **Conflicting timeframes** (long-term bullish, short-term bearish)

Contradictions are INFORMATION about market state:
- Research deeper before taking position
- Consider range-trading strategies
- Wait for resolution/confirmation
- Size positions more conservatively

They're not errors - they're data points revealing market uncertainty.

**Q: Can Kairos help with portfolio construction?**

Kairos provides tactical input for portfolio decisions, not strategic allocation guidance. Use Kairos for:
- Timing refinement of asset additions
- Risk alert monitoring for rebalancing triggers
- Relative strength analysis across holdings
- Correlation shift detection

But portfolio construction requires:
- Strategic asset allocation framework
- Diversification methodology
- Risk budgeting approach
- Investment policy statement
- Rebalancing rules

Use Kairos to refine timing within your strategic framework, not to drive strategic decisions.

**Q: How accurate are the models?**

"Accuracy" isn't the right framework for non-deterministic pattern detection. Better questions:

- **What are historical hit rates?** Shown per discovery in metrics
- **How large are typical drawdowns?** Shown per discovery
- **How long do patterns take to resolve?** Shown in time tracking
- **How often do patterns fail?** Shown in aggregate statistics

Models detect statistically interesting patterns that play out sometimes, not predictions that are "accurate" or "inaccurate." They provide edge through statistics, not through accuracy on individual discoveries.

**Q: Does Kairos work in all market conditions?**

Model performance varies by market regime:

**Trending Markets:** Moderate performance (patterns clear but extended)
**Volatile Markets:** Strong performance (clear pattern formation)
**Range-Bound Markets:** Variable (patterns less distinct)
**Low Volatility:** Weak performance (few patterns detected)

The models don't assume stable conditions, but they do perform better when market microstructure shows clear patterns. During extreme low volatility, fewer discoveries trigger (which is itself information about market state).

---

## Critical Reminders

### Before Every Trading Decision

**Checklist - Complete Analysis:**
- [ ] Have I conducted comprehensive fundamental analysis?
- [ ] Have I considered macroeconomic context and broader market conditions?
- [ ] Have I checked recent news and developments for this asset?
- [ ] Have I analyzed order book depth and liquidity for my intended size?
- [ ] Have I validated the setup with MY own technical indicators?
- [ ] Have I assessed how this fits my overall portfolio allocation?
- [ ] Have I checked correlation with existing positions?

**Checklist - Risk Management:**
- [ ] Have I sized this position according to MY risk management rules?
- [ ] Can I tolerate the historical drawdown magnitude shown?
- [ ] Have I defined MY stop-loss placement (not just using risk zone)?
- [ ] Have I defined MY profit-taking strategy and exit criteria?
- [ ] Can I afford to lose this ENTIRE position without material impact?
- [ ] Have I checked my total portfolio risk budget utilization?

**Checklist - Emotional Readiness:**
- [ ] Am I making this decision calmly and rationally?
- [ ] Am I trading with capital I can afford to lose completely?
- [ ] Have I avoided revenge trading or FOMO-driven decisions?
- [ ] Am I comfortable holding this position through expected volatility?
- [ ] Will this position affect my sleep, relationships, or wellbeing?

**If you cannot confidently answer YES to all relevant questions, DO NOT TRADE.**

---

### When to Step Away from Trading

Stop using Kairos and step away when:

**Behavioral Warning Signs:**
- Treating discoveries as guaranteed profits
- Ignoring your risk management rules consistently
- Trading with money needed for living expenses
- Revenge trading after losses
- Feeling desperate, emotional, or compulsive about trading
- Over-leveraging based on pattern "confidence"
- Checking prices obsessively (constantly, during sleep, at work)
- Unable to close losing positions (hoping for recovery)
- Increasing position sizes after losses (doubling down)
- Hiding trading activity from family or partners

**Psychological Warning Signs:**
- Trading affecting personal relationships
- Experiencing financial or emotional stress from trading
- Neglecting work, health, or responsibilities
- Feeling euphoric after wins, devastated after losses
- Making impulsive decisions without analysis
- Using credit or borrowing money to trade

**If you recognize these patterns:**
1. **Stop trading immediately**
2. **Seek professional help** (financial advisor, therapist)
3. **Talk to trusted friends or family**
4. **Take extended break** (weeks or months)
5. **Reassess whether trading is appropriate for you**

**Trading should never compromise your mental health, relationships, or financial security.**

---

### Maintaining Healthy Perspective

**Remember:**
- Markets will exist tomorrow (no urgency)
- No single trade determines your success
- Losses are learning experiences, not failures
- Capital preservation is more important than profits
- Your worth is NOT determined by trading outcomes
- Taking breaks is essential for longevity
- Even professionals lose regularly
- Risk management matters more than being right

**Healthy Trading Mindset:**
- **Process over outcomes**: Did I follow my rules? (More important than profit/loss)
- **Long-term perspective**: Success is measured in years, not days
- **Continuous learning**: Every trade teaches something valuable
- **Emotional detachment**: Outcomes don't define you as a person
- **Risk awareness**: Every trade could fail
- **Humility**: Markets are larger than any individual
- **Balance**: Trading is part of life, not all of life

---

## Resources & Support

### Educational Materials

**Recommended Reading:**
- "Trading and Exchanges" by Larry Harris - Market microstructure fundamentals
- "Algorithmic Trading" by Ernie Chan - Quantitative trading approaches
- "The Psychology of Trading" by Brett Steenbarger - Mental aspects of trading
- "Risk Management in Trading" by Davis Edwards - Risk frameworks
- "A Random Walk Down Wall Street" by Burton Malkiel - Market efficiency perspective

**Online Resources:**
- Investopedia - Basic trading concepts and definitions
- Coursera/edX - Market microstructure courses
- Khan Academy - Financial markets basics

### Getting Support

**Kairos Support:**
- Support Email: [support@kairos.quantlabs.com]
- Documentation: [docs.kairos.quantlabs.com]
- Community Forum: [community.kairos.quantlabs.com]

**Mental Health Resources:**
If trading is affecting your wellbeing:
- National Problem Gambling Helpline: 1-800-522-4700 (US)
- GamCare: 0808 8020 133 (UK)
- Mental health professionals in your area
- Support groups for trading addiction

**Financial Guidance:**
- Certified Financial Planners (CFP)
- Chartered Financial Analysts (CFA)
- Fee-only financial advisors (avoid conflicts of interest)

---

## Handbook Version & Updates

**Current Version:** 1.0  
**Last Updated:** January 2025  
**Next Review:** Quarterly

This handbook is a living document updated to reflect:
- New features and functionality
- Model updates (Hunter S2 launch)
- User feedback and frequently asked questions
- Regulatory requirement changes
- Best practices evolution

**Changelog:**
- Version 1.0 (January 2025): Initial comprehensive handbook release

---

## Final Words

Kairos represents sophisticated quantitative infrastructure - institutional-grade data collection (Butterfly), non-parametric statistical modeling (Quant Labs), and transparent performance tracking. It provides genuine analytical value when used responsibly as part of a comprehensive decision-making process.

**What makes Kairos valuable:**
- High-quality tick-level data with rigorous validation
- Transparent methodology without black-box claims
- Complete historical tracking (no cherry-picking)
- Non-parametric models adapting to market reality
- Microstructure analysis capturing dynamics others miss

**What doesn't make Kairos valuable:**
- Using it as your sole analytical input
- Treating it as a signal service or trading bot
- Expecting it to make decisions for you
- Believing it guarantees profitable outcomes
- Abandoning independent analysis and judgment

**Success with Kairos requires:**
- Comprehensive independent analysis across multiple dimensions
- Disciplined risk management with pre-defined rules
- Emotional control and patience through volatility
- Continuous learning and strategy refinement
- Healthy relationship with trading (balance, perspective, wellbeing)
- Acceptance of full personal responsibility for all outcomes

Use Kairos as a sophisticated tool within your analytical toolkit. Integrate discoveries into your existing methodology. Validate everything with multiple information sources. Make independent decisions. Accept complete responsibility.

**Trade responsibly. Protect your capital. Prioritize your wellbeing above all else.**

---

**Remember: Kairos shows you where models detect patterns. You decide what to do about it.**

- **The machine** (Quant Labs models) analyzes the data
- **The fuel** (Butterfly infrastructure) powers the analysis  
- **The driver** (YOU) makes all decisions and accepts all outcomes

Trade wisely. Manage risk ruthlessly. Take care of yourself.

---

*End of Kairos Handbook*`;

    try {
        console.log('📄 Starting document upload...');

        const result = await uploadDocument(
            'KAIROS User Handbook',
            handbookContent,
            'handbook.txt',
            {
                version: '1.0',
                category: 'user-guide',
            }
        );

        console.log('✅ SUCCESS! Document uploaded with ID:', result.id);
        process.exit(0);
    } catch (error) {
        console.error('❌ FAILED:', error);
        process.exit(1);
    }
}

main();