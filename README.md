# Austin Pilots website

A simple Jekyll site for GitHub Pages. GitHub builds Jekyll sites automatically —
no build step required on your end.

## To finish setup

1. **Next meetup** — in `index.html`, fill in the date/time/location/details,
   and replace the two `href="#"` links with your actual Facebook event URL
   and GroupMe join link.
2. **Contact link** — in `_includes/footer.html`, replace the placeholder
   email address.
3. **Flight schools / software pages** — edit `flight-schools.html` and
   `aviation-software.html` directly; each entry is one `.card` block.

The real logo is wired in at `assets/img/logo.png` (`assets/img/logo-placeholder.svg`
is unused now and can be deleted whenever).

## Publishing on GitHub Pages

This repo is served at the custom domain in `CNAME` (**austinpilots.net**), so
`_config.yml` keeps `baseurl` empty and `url` set to that domain.

1. Push this folder to the `aboyden/austinpilots` GitHub repo.
2. In the repo, go to **Settings → Pages** and confirm the source is the
   `main` branch (root) and the custom domain is set to `austinpilots.net`.
3. DNS for `austinpilots.net` needs to point at GitHub Pages (an `A`/`ALIAS`
   record to GitHub's IPs, or a `CNAME` record to `aboyden.github.io` for a
   subdomain) — see GitHub's "Managing a custom domain" docs if that isn't
   already set up.

## Previewing locally (optional)

If you have Ruby + Bundler installed:

```bash
gem install bundler jekyll
jekyll serve
```

Then open `http://localhost:4000`.
