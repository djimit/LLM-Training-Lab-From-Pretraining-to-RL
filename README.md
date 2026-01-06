<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# LLM Training Lab: From Pretraining to RL

An interactive educational platform for understanding the complete LLM training stack, from raw text pretraining through supervised fine-tuning (SFT) to reinforcement learning techniques like PPO and DPO.

View your app in AI Studio: https://ai.studio/apps/drive/1mpgWC3XishsxWk0KQC90wFhLdGf46J_R

## ⚠️ Security Warning

**This application exposes API keys in the client-side JavaScript bundle and is ONLY suitable for local development and educational purposes.**

**DO NOT deploy this application to production without implementing proper backend security:**
- API calls must be moved to a backend server
- Environment variables must be server-side only
- Implement authentication and rate limiting
- Never commit `.env.local` to version control

See [Security Best Practices](#security-best-practices) below for details.

## Run Locally

**Prerequisites:** Node.js 18+ and npm

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd LLM-Training-Lab-From-Pretraining-to-RL
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Copy `.env.local.example` to `.env.local`
   - Get your Gemini API key from https://ai.google.dev/
   - Update `.env.local` with your actual API key:
     ```bash
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** to http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server (default port: 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Security Best Practices

### For Local Development

✅ **Safe for local use** - The application is designed for educational purposes and local development.

### For Production Deployment

❌ **NOT production-ready as-is** - You must implement these changes:

1. **Create a backend API server**:
   ```
   frontend (React) → backend (Node.js/Python/etc.) → Gemini API
   ```

2. **Move API calls server-side**:
   - All `geminiService.ts` calls should go to your backend
   - Backend should manage the API key securely
   - Never send API keys to the client

3. **Implement authentication**:
   - Require user login for API access
   - Rate limit requests per user
   - Track usage and enforce quotas

4. **Use server-side environment variables**:
   - Remove `VITE_` prefix (no longer needs client exposure)
   - Store in server environment or secrets manager
   - Never commit to version control

5. **Host dependencies locally**:
   - Download TailwindCSS and build it into your bundle
   - Use npm packages instead of CDN imports (esm.sh)
   - Implement strict Content Security Policy

### Additional Security Measures

- ✅ TypeScript strict mode enabled
- ✅ Input validation and sanitization
- ✅ Error boundary for graceful error handling
- ✅ Rate limiting on client-side API calls
- ✅ Content Security Policy headers
- ⚠️ External CDN dependencies (must be replaced for production)

## Project Structure

See [CLAUDE.MD](./CLAUDE.MD) for comprehensive documentation including:
- Detailed project architecture
- Component descriptions
- Development workflow
- Educational content philosophy

## Features

- 🎓 **Interactive Learning**: Hands-on exploration of LLM training concepts
- 📊 **Visual Comparisons**: Side-by-side SFT vs RL model simulations
- 🧪 **Sandbox Testing**: Test prompts with different training strategies
- 🎯 **Technical Accuracy**: Based on research papers (DPO arXiv:2305.18290)
- ♿ **Accessible**: ARIA labels and keyboard navigation support

## License

See LICENSE file for details.

## Contributing

Contributions are welcome! Please ensure:
- Code follows existing TypeScript/React patterns
- New features maintain educational clarity
- Security best practices are followed
- Tests are added for new functionality (when test suite is implemented)

## Troubleshooting

### "API key not configured" error
- Ensure `.env.local` exists and contains `VITE_GEMINI_API_KEY`
- Restart the dev server after changing `.env.local`
- Check that the key doesn't have extra spaces or quotes

### Rate limit errors
- Wait 2 seconds between API requests (client-side throttling)
- Check your Gemini API quota at https://ai.google.dev/

### Build errors after updates
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear browser cache and rebuild

## Support

For issues or questions:
- Check [CLAUDE.MD](./CLAUDE.MD) for detailed documentation
- Open an issue on GitHub
- Review the code review comments in commit history
