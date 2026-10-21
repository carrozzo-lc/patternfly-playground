# Search and organization — Option 1

Open **Implementation notes** below the experiment description for the PF6 component mapping, state ownership, local CSS adjustments, interaction behavior, and source links. The content is specific to this version and loads when the dialog is opened.

Current stage: **interactive controls (step 3)**. Both contexts use the same controlled `SearchOrganizationBar` composition of PF6 components.

- Routes: search matches route name, network, nation, or type (case-insensitive, surrounding whitespace ignored). Matching routes keep their network → Nation/Type hierarchy. Type values are TCR, RCR, and Neither. Search expands matching paths and announces the result count or an empty result message.
- Group by: Nation / Type changes the grouping while preserving the query and selected route IDs. The summary counts selected routes across the whole fixture set, including hidden results. Select All / Deselect All retain their global scope; individual visible groups affect their displayed descendants.
- Movement Mission: the Search field and four sort options (Departure ↑ / ↓, Arrival ↑ / ↓) keep their own state. Mission summary and Mission legs remain neutral placeholders. This context demonstrates the controls and their selected state; it does not filter or reorder mission data.
- Menus close after selection, Escape, Tab, or an outside click. Selection and Escape return focus to the toggle. Enter / Space open the menu; Arrow Down can also open it. PF6 handles option navigation and the selected checkmark. Sort arrows have explicit ascending/descending accessible labels.
- Fictional route fixtures live in `demoData.ts`; menu choices live in `organizationOptions.ts`. No product screenshots or assets are included.

## Component and styling

`components/SearchOrganizationBar.tsx` composes PF6 [InputGroup](https://www.patternfly.org/components/input-group/), TextInput (`type="search"`), [Select](https://www.patternfly.org/components/menus/select/), MenuToggle, SelectList, and SelectOption. It uses TextInput to match the text-field reference without adding a search icon.

Consumers provide the controlled `query`, `value`, change callbacks, search label/placeholder, organization label, and typed options. Only menu open/closed state is internal. The component does not own filtering or grouping logic. Its implementation remains local to this experiment version until another experiment needs it.

`SearchOrganizationBar.module.css` contains the explicit style customization: zero InputGroup gap, one overlapping border, outside corners, compact padding, a 12px prefix and a 14px Medium (500) value. Both controls are 37px high with the current PF6 typography. Each remains a separate focusable control; their focus outlines are preserved. The input fills the available width and the toggle fits its visible value.

The Select popup is portalled to the document body through PF6 Popper so it can overlap the card/map without clipping. It follows the toggle width, uses compact PF6 menu spacing, and remains aligned when the page scrolls. No dependency or library source changes are needed.

The preview shows two independent contexts: grouping routes in the Routes panel, and sorting legs in a Movement Mission detail card. Selecting a route does not open the mission card.

The desktop workspace uses a 340px routes panel and a 430px floating Movement Mission detail card. Below a 1000px workspace width, the panel, map, and detail card stack vertically; the card retains its reference height. PF6 Panel and Card provide the UI containers and [TreeView](https://www.patternfly.org/components/tree-view/) handles the route hierarchy. The CSS Module handles layout and reference dimensions. The mission card retains the step 1 dimensions (430 × 668px on desktop).

The background uses the [official OpenStreetMap embed](https://wiki.openstreetmap.org/wiki/Export#Embeddable_HTML), with a generic central European viewport and visible attribution. It needs internet access, loads independently from the controls, and uses no additional mapping dependency. OpenStreetMap data is licensed under the ODbL; see the [copyright and attribution information](https://www.openstreetmap.org/copyright).

Browser tests substitute only the external map document so layout checks do not depend on the third-party service. Check the real map separately in the local preview.
