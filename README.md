# Room Lookup

Enter an **Employee ID** or **Mobile Number** to see:
Employee Name, Work Mandal, Designation, Working Place Name, Floor, Room No, Sl. No.

Pure HTML/CSS/JS: no build step, no backend.

## Files
| File | Purpose |
|------|---------|
| `index.html` | Page layout |
| `style.css` | Styling |
| `script.js` | Search logic |
| `data.json` | Employee data (converted from `Data_1.xlsx`, 1200 records) |

## Deploy on GitHub Pages
1. Upload all files to the root of the repository.
2. **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.**
3. Site is live at `https://<your-username>.github.io/<repo-name>/`.

## Run locally
```
python -m http.server 8000
```
Open http://localhost:8000 (opening index.html by double-click will not work).

## Updating the data
Replace `data.json` with a new export using these field names:
`id, mobile, name, mandal, designation, place, floor, room, slno`.
