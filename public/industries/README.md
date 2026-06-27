# Industry background photos

`ProductCategories` renders a full-bleed photo card for an industry when a file
named `<slug>.jpg` exists here (slug = `parseIndustryToSlug(name)`), otherwise it
falls back to the flat glass-card. Drop in these 4 to enable the photo treatment:

| Industry | File | Unsplash photo |
|---|---|---|
| Pharmaceutical | `pharmaceutical.jpg` | https://unsplash.com/photos/8e8Stpw4Gr8 |
| Agrochemicals | `agrochemicals.jpg` | https://unsplash.com/photos/elcVuEs24Bc |
| Healthcare | `healthcare.jpg` | https://unsplash.com/photos/hIgeoQjS_iE |
| Industrial Chemicals | `industrial-chemicals.jpg` | https://unsplash.com/photos/YffeRZ-Q8us |

Optimize to ~1600px wide, ~80% quality. Local files mean no `next.config` change
(CSS `background-image` doesn't go through `next/image`).
