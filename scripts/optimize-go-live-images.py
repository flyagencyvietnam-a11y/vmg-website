"""Create web-ready WebP copies of the large raster assets used by the public site."""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PRODUCT_NAMES = (
    "b2b-v2.png", "cambridge-testing-v2.png", "edunext-v2.png", "eplus-v2.png",
    "flextrack-v2.png", "ft15-v2.png", "giao-tiep-v2.png", "hsk-v2.png",
    "ielts-booster-v2.png", "ielts-express-v2.png", "ielts-focus-v2.png", "kids-v2.png",
    "kindy-v2.png", "nextgen-ielts-v2.png", "ngan-hang-de-v2.png", "sat-v2.png",
    "summer-school-v2.png", "tesol-epath-v2.png", "tesol-offline-v2.png", "thpt-v2.png",
    "tieng-trung-v2.png", "toeic-v2.png", "vstep-express-v2.png", "vstep-mastery-v2.png",
    "summer-us.png", "summer-au.png", "summer-sg.png", "summer-ph.png",
    "long-us.png", "long-au.png", "long-ca.png", "long-tw.png",
    "su-kien-du-hoc.png", "xuat-khau-lao-dong.png",
)
TARGETS = [
    *[ROOT / "src" / "assets" / name for name in (
        "hero-child-v3.png",
        "hero-teen-v3.png",
        "hero-study-abroad-v3.png",
        "hero-career-v3.png",
    )],
    *[ROOT / "src" / "assets" / "products" / name for name in PRODUCT_NAMES],
    *(ROOT / "public" / "hall-of-fame").glob("*.png"),
]


for source in TARGETS:
    if not source.exists():
        continue
    destination = source.with_suffix(".webp")
    with Image.open(source) as image:
        image.save(destination, "WEBP", quality=82, method=6)
    print(f"{source.relative_to(ROOT)} -> {destination.stat().st_size / 1024:.0f} KB")
