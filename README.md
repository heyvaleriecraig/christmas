# Family Christmas List

A one-page Christmas wish list. Family members tap the gifts they want to give, tap
**I'm getting these**, and those gifts are crossed off for everyone. Nobody needs an account.

The list of what's been bought is kept in a Google Sheet you own, through a small Google Apps
Script. Until that's connected, the page still works as a list, but crossing off is turned off.

## Turn on crossing off (about 5 minutes)

1. Create a new Google Sheet, for example "Christmas list – bought".
2. In the sheet, open **Extensions → Apps Script**. Delete what's there and paste in all of
   `google-apps-script.gs`. Save.
3. Click **Deploy → New deployment**, choose the type **Web app**, and set
   - Execute as: **Me**
   - Who has access: **Anyone**
   
   Click **Deploy** and approve the permissions when Google asks.
4. Copy the **Web app URL**. It starts with `https://script.google.com/macros/s/` and ends in `/exec`.
5. In `index.html`, find `PASTE_YOUR_WEB_APP_URL_HERE` and replace it with that URL. Commit.

The Sheet's **Bought** tab will then show every item someone crossed off, with the time. To reset
an item, delete its row there, or tap **Undo** on the page.

## Editing the list

Gifts live in the `PEOPLE` list near the top of the script in `index.html`. Each item is
`["unique-id", "Name", "Note", "Price", "Link"]`. Keep ids unique, and don't change an id after
someone has bought it, or it will lose its crossed-off status.

## Publishing

This repo is set up for GitHub Pages (Settings → Pages → Deploy from branch `main`, folder `/`).
Note that anyone with the link can see the list and cross things off.
