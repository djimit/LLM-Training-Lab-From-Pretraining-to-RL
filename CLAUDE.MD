# CLAUDE.MD

## Project Overview

**LLM Training Lab: From Pretraining to RL** is an interactive educational web application that teaches users about the complete LLM training stack, from raw text pretraining through supervised fine-tuning (SFT) to reinforcement learning techniques like PPO and DPO.

### Purpose
This application provides an interactive learning experience explaining how Large Language Models evolve from simple next-token prediction to aligned, helpful AI assistants through various training stages.

## Technology Stack

- **Framework**: React 19.2.3 with TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: TailwindCSS (via inline classes)
- **Charts**: Recharts 3.6.0
- **AI Integration**: Google Gemini AI (@google/genai 1.34.0)
- **Language**: TypeScript 5.8.2

## Project Structure

```
/
├── App.tsx                      # Main application component
├── index.tsx                    # Entry point
├── types.ts                     # TypeScript type definitions
├── constants.tsx                # Training stage configurations
├── components/                  # React components
│   ├── StageCard.tsx           # Training stage selector cards
│   ├── FailureModeSection.tsx  # Explains common training failures
│   ├── ComparisonPlayground.tsx # SFT vs RL comparison tool
│   ├── RLSuitabilityPlanner.tsx # Decision helper for RL adoption
│   ├── DPOVisualizer.tsx       # DPO algorithm visualization
│   ├── PipelineDeepDive.tsx    # Training pipeline details
│   ├── ArchitectureComparison.tsx # PPO vs DPO architecture
│   ├── AlignmentTechnicalSpecs.tsx # Technical specifications
│   ├── PromptTuningExplorer.tsx # Prompt tuning vs fine-tuning
│   ├── DecisionTree.tsx         # RL investment decision tree
│   ├── PipelineComparisonMatrix.tsx # PPO vs DPO comparison
│   ├── TrainingSimulator.tsx    # Interactive training simulation
│   └── PipelineArchitectureFlow.tsx # Pipeline flow diagram
├── services/
│   └── geminiService.ts        # Google Gemini API integration
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts

```

## Key Concepts Explained

### Training Stages (TrainingStage enum in types.ts)

1. **PRETRAINING**: Raw text prediction, learning language patterns
2. **SFT (Supervised Fine-Tuning)**: Learning instruction-following from human demonstrations
3. **RLHF_DPO**: Reinforcement learning from human feedback using Direct Preference Optimization

### Core Components

#### App.tsx (Main Application)
- Manages active training stage state
- Renders hero section and all educational components
- Provides capability visualization charts for each stage
- Orchestrates the complete learning flow

#### Interactive Components
- **TrainingSimulator**: Simulates the training process with real-time metrics
- **DPOVisualizer**: Demonstrates how DPO works mathematically
- **ComparisonPlayground**: Side-by-side comparison of different approaches
- **RLSuitabilityPlanner**: Helps users decide when to use RL techniques
- **DecisionTree**: Visual guide for RL investment decisions

## Development Workflow

### Setup
```bash
npm install
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Environment Variables
- Create a `.env.local` file
- Set `GEMINI_API_KEY` with your Google Gemini API key

### Key Files to Modify

**Adding New Training Stages:**
1. Update `types.ts` to add new enum value
2. Add stage configuration in `constants.tsx`
3. Update visualization data in `App.tsx`

**Adding New Components:**
1. Create component in `/components` directory
2. Import and use in `App.tsx`
3. Follow existing Tailwind styling patterns

**Modifying Visualizations:**
- All charts use Recharts library
- Data flows from `getVisualizationData()` in App.tsx
- Customize colors via inline Tailwind classes

## Important Technical Notes

### Styling Approach
- Uses TailwindCSS utility classes exclusively
- Responsive design with mobile-first approach
- Dark mode support in hero section
- Consistent color palette:
  - Blue (`blue-400/500`) for Pretraining
  - Purple (`purple-400/500`) for SFT
  - Emerald (`emerald-400/500`) for RLHF/DPO

### State Management
- React useState for local component state
- No external state management library
- Props drilling for component communication

### Performance Considerations
- Lazy loading not implemented (consider for production)
- All components load on initial render
- Recharts handles chart rendering optimization

### AI Integration
- Gemini API used via `geminiService.ts`
- API key required in `.env.local`
- Used for interactive features and comparisons

## Code Conventions

### TypeScript
- Strict type checking enabled
- Interface definitions in `types.ts`
- React.FC for functional components
- Explicit return types preferred

### Component Structure
```typescript
import React from 'react';
import { ComponentProps } from './types';

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // State and hooks
  // Event handlers
  // Render logic
  return (
    <div className="tailwind-classes">
      {/* JSX */}
    </div>
  );
};

export default Component;
```

### File Organization
- One component per file
- Component name matches filename
- Default export for components
- Named exports for utilities/constants

## Educational Content Philosophy

This application teaches through:
1. **Visual Learning**: Charts and diagrams illustrate abstract concepts
2. **Interactive Exploration**: Users can experiment with different stages
3. **Progressive Disclosure**: Information revealed as users explore
4. **Technical Accuracy**: Based on real papers (e.g., DPO arXiv:2305.18290)
5. **Comparative Analysis**: Shows tradeoffs between approaches

## Common Tasks

### Adding a New Section
1. Create component in `/components/NewSection.tsx`
2. Import in `App.tsx`: `import NewSection from './components/NewSection';`
3. Add to render tree in appropriate location
4. Follow existing styling patterns

### Modifying Training Stage Data
- Edit `constants.tsx` STAGES array
- Update capability profiles in `getVisualizationData()`
- Ensure consistent color scheme

### Updating Dependencies
```bash
npm update                    # Update all dependencies
npm update package-name       # Update specific package
npm outdated                  # Check for outdated packages
```

## Testing Strategy

Currently no automated tests. For manual testing:
1. Test all three training stage views
2. Verify all interactive components work
3. Check responsive design on mobile/tablet/desktop
4. Validate chart renderings
5. Test Gemini API integration

## Deployment

This is a static site that can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Build command: `npm run build`
Output directory: `dist/`

## Resources

### Key Papers Referenced
- **DPO Paper**: arXiv:2305.18290 (Direct Preference Optimization)
- Based on modern RLHF techniques

### Related Technologies
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide)
- [Recharts Documentation](https://recharts.org)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Google Gemini API](https://ai.google.dev/docs)

## Future Enhancements

Consider implementing:
- [ ] Lazy loading for better performance
- [ ] Automated tests (Jest + React Testing Library)
- [ ] More interactive simulations
- [ ] Additional training techniques (RLAIF, Constitutional AI)
- [ ] Multi-language support
- [ ] Offline mode without Gemini dependency
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Animation performance optimization

## Notes for Claude

When working on this project:
- **Read before editing**: Always read components before modifying
- **Preserve styling**: Maintain consistent Tailwind patterns
- **Type safety**: Ensure TypeScript types are correct
- **Educational accuracy**: Verify technical claims against papers
- **Component isolation**: Keep components focused and reusable
- **Responsive design**: Test changes on multiple screen sizes
- **Performance**: Consider bundle size when adding dependencies
- **Documentation**: Update this file when making structural changes

### Common Pitfalls
- Don't mix inline styles with Tailwind classes
- Avoid breaking the educational flow with too much complexity
- Keep technical accuracy high - this is an educational tool
- Maintain consistent terminology across components
- Don't add dependencies without justification

---

**Last Updated**: 2026-01-06
**Project Version**: 0.0.0
**Maintainer**: AI Studio
