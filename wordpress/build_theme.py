#!/usr/bin/env python3
"""Build the KURO WordPress theme from ../index.html.

index.html stays the single source of truth. This script wraps it in a
minimal classic theme (style.css + functions.php + index.php) and zips it
to wordpress/kuro-theme.zip, ready for Appearance -> Themes -> Upload.

Usage:  python3 wordpress/build_theme.py
"""
import pathlib, shutil, zipfile, datetime

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "index.html"
OUT_DIR = ROOT / "wordpress" / "kuro-theme"
ZIP = ROOT / "wordpress" / "kuro-theme.zip"
SHOT = ROOT / "wordpress" / "screenshot.png"
VERSION = "4.0." + datetime.date.today().strftime("%Y%m%d")

STYLE_CSS = f"""/*
Theme Name: KURO
Theme URI: https://kuro-agency-website.vercel.app/
Author: KURO Studio
Description: One-page site for KURO, a design & engineering studio. All styles and scripts are inline in index.php; this file only registers the theme.
Version: {VERSION}
Requires at least: 6.0
Requires PHP: 7.4
License: All rights reserved
Text Domain: kuro
*/
"""

FUNCTIONS_PHP = r"""<?php
/**
 * KURO theme setup.
 * The page ships its own CSS/JS inline, so we strip WordPress' default
 * front-end styles and scripts that would otherwise fight the design.
 */
if (!defined('ABSPATH')) { exit; }

add_action('wp_enqueue_scripts', function () {
    foreach (['wp-block-library', 'wp-block-library-theme', 'global-styles', 'classic-theme-styles', 'core-block-supports'] as $handle) {
        wp_dequeue_style($handle);
        wp_deregister_style($handle);
    }
}, 100);

remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'wp_generator');
remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');
remove_action('wp_footer', 'wp_enqueue_global_styles', 1);
"""

ADMIN_BAR_CSS = """<?php if (function_exists('is_admin_bar_showing') && is_admin_bar_showing()) : ?>
<style>.site-header{top:32px}.mobile-menu{top:32px}@media (max-width:782px){.site-header,.mobile-menu{top:46px}}</style>
<?php endif; ?>
"""


def build():
    html = SRC.read_text(encoding="utf-8")
    if "<?" in html or "?>" in html:
        raise SystemExit("index.html contains PHP-like tags ('<?' or '?>'); escape them before building.")
    for marker in ("</head>", "</body>"):
        if html.count(marker) != 1:
            raise SystemExit(f"Expected exactly one {marker} in index.html")
    html = html.replace("</head>", ADMIN_BAR_CSS + "<?php wp_head(); ?>\n</head>", 1)
    html = html.replace("</body>", "<?php wp_footer(); ?>\n</body>", 1)
    header = "<?php\n/**\n * KURO — generated from index.html by wordpress/build_theme.py. Do not edit by hand.\n */\nif (!defined('ABSPATH')) { exit; }\n?>\n"

    if OUT_DIR.exists():
        shutil.rmtree(OUT_DIR)
    OUT_DIR.mkdir(parents=True)
    (OUT_DIR / "style.css").write_text(STYLE_CSS, encoding="utf-8")
    (OUT_DIR / "functions.php").write_text(FUNCTIONS_PHP, encoding="utf-8")
    (OUT_DIR / "index.php").write_text(header + html, encoding="utf-8")
    if SHOT.exists():
        shutil.copy(SHOT, OUT_DIR / "screenshot.png")

    with zipfile.ZipFile(ZIP, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(OUT_DIR.iterdir()):
            z.write(f, f"kuro/{f.name}")
    shutil.rmtree(OUT_DIR)
    print(f"Built {ZIP.relative_to(ROOT)} (version {VERSION}, {ZIP.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    build()
