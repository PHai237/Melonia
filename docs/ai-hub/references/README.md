# Reference provenance

**Status: owner-selected design reference installed. NOT an approved production sprite.**

| Provenance field | Value |
| --- | --- |
| Hub reference | [protagonist-turnaround.png](protagonist-turnaround.png) |
| Original file | `public/assets/sprites/player/Gemini_Generated_Image_y5r3i7y5r3i7y5r3.png` |
| Source | User-supplied Gemini turnaround already present in the workspace |
| Selection evidence | Owner supplied the original Gemini download and explicitly confirmed SHA256, dimensions and byte size for PIXEL-CHAR-001 Reference Gate |
| Identification | Image visibly labels FRONT / DOWN, BACK / UP, RIGHT-FACING SIDE and matches those character identifiers |
| Canvas / format | 2048×1273, PNG; 4,311,155 bytes |
| SHA256, source and copy | `1c3ea16ae7d4c10681ff20ebf50af4c983ef90cbf9cb092d252054c705e41270` |
| Copy operation | Byte-for-byte copy; no crop, resize, recolour, quantization or metadata edits |
| Scope of selection | Character design reference only; no production sprite or final style approval |

The single-view `melonia_approved_character_reference.png`, village concepts and v0/v1 trial sprites were not selected or copied in place of this turnaround. Optional `village-concept.png` remains absent. The source file stays untouched in its original location; this documentation copy is not added to the production asset manifest.

Keep reference provenance separate from sprite acceptance. No production asset is accepted merely because a technical check passed. If an agent cannot access this reference (including until an approved push), record it as unavailable rather than inventing a replacement.

Reference Gate correction: the previously copied 2624×1632 / 6,126,708-byte variant failed the owner's checksum gate. It was replaced only after the re-downloaded source matched the exact owner-supplied SHA256 above, then checked again after copying with Get-FileHash. The earlier variant is not the locked reference. No image generation, resize or conversion was performed.
