<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application conventions
- Keep the shared Clyra header and footer in the Next.js root layout (`app/layout.tsx`), with one content route per navigation item, so all pages share navigation and retain independent metadata.
- Keep service definitions in a browser-safe catalog consumed by home and Services so offerings stay consistent across views.
- The homepage hero and services are one scroll-driven frame sequence. Desktop frames live in `public/frames` and mobile frames in `public/frames-mobile`, extracted from the tunnel video. Play those frames on a canvas; do not draw a 3D scene or CSS wormhole on the homepage.
- Contact inquiries are reviewed and downloaded locally until an actual delivery destination is supplied; never imply an inquiry was sent.
