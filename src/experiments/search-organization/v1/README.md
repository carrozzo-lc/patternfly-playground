# Search and organization — Option 1

Current stage: **layout preview**. The search, grouping, sorting, and result areas are static placeholders. Their behavior will be implemented in subsequent steps.

The preview shows two independent contexts: grouping routes in the Routes panel, and sorting legs in a Movement Mission detail card. Selecting a route does not open the mission card.

The desktop workspace uses a 340px routes panel and a 430px floating Movement Mission detail card. Below a 1000px workspace width, the panel, map, and detail card stack vertically. PF6 Panel and Card provide the UI containers; the CSS Module handles this experiment's layout and reference dimensions.

The background uses the [official OpenStreetMap embed](https://wiki.openstreetmap.org/wiki/Export#Embeddable_HTML), with a generic central European viewport and visible attribution. It needs internet access, loads independently from the controls, and uses no additional mapping dependency. OpenStreetMap data is licensed under the ODbL; see the [copyright and attribution information](https://www.openstreetmap.org/copyright).

Browser tests substitute only the external map document so layout checks do not depend on the third-party service. Check the real map separately in the local preview.
