# Search and organization — Option 1

Current stage: **demo content (step 2)**. Fictional routes populate the Routes panel; the Movement Mission card retains the neutral placeholders from step 1. Search, grouping changes, and sorting remain labelled placeholders until step 3.

- Routes: network → nation → route tree, checkbox selection (including partial parent selection), Select All / Deselect All, and Expand all / Collapse all. The summary counts routes, not grouping nodes.
- Movement Mission: the step 1 layout, with Mission summary, Search + sorting, and Mission legs placeholders, keeps the focus on the control location.
- Fictional route fixtures are kept in `demoData.ts`, separately from the UI.

The preview shows two independent contexts: grouping routes in the Routes panel, and sorting legs in a Movement Mission detail card. Selecting a route does not open the mission card.

The desktop workspace uses a 340px routes panel and a 430px floating Movement Mission detail card. Below a 1000px workspace width, the panel, map, and detail card stack vertically; the card retains its reference height. PF6 Panel and Card provide the UI containers and [TreeView](https://www.patternfly.org/components/tree-view/) handles the route hierarchy. The CSS Module handles layout and reference dimensions. The mission card retains the step 1 dimensions (430 × 668px on desktop).

The background uses the [official OpenStreetMap embed](https://wiki.openstreetmap.org/wiki/Export#Embeddable_HTML), with a generic central European viewport and visible attribution. It needs internet access, loads independently from the controls, and uses no additional mapping dependency. OpenStreetMap data is licensed under the ODbL; see the [copyright and attribution information](https://www.openstreetmap.org/copyright).

Browser tests substitute only the external map document so layout checks do not depend on the third-party service. Check the real map separately in the local preview.
