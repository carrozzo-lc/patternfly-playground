import { Fragment } from 'react'
import { CodeBlock, CodeBlockCode, Content, Stack, StackItem } from '@patternfly/react-core'
import packageJson from '../../../../package.json'
import styles from './ImplementationNotes.module.css'

const sourceRoot = 'https://github.com/carrozzo-lc/patternfly-playground/blob/develop/'
const experimentRoot = `${sourceRoot}src/experiments/search-organization/v1/`

const components = [
  {
    name: 'InputGroup', href: 'https://www.patternfly.org/components/input-group/',
    purpose: 'Places search and organization controls on one row. role="group" and an accessible name describe their relationship.',
  },
  {
    name: 'InputGroupItem', href: 'https://www.patternfly.org/components/input-group/',
    purpose: 'Wraps each control. isFill lets the search field use the remaining space; the select item keeps its content width through local CSS.',
  },
  {
    name: 'TextInput', href: 'https://www.patternfly.org/components/forms/text-input/',
    purpose: 'Uses type="search", value, onChange, placeholder, id, and aria-label. This matches the text-field reference without adding the icon and extra actions of SearchInput.',
  },
  {
    name: 'Select', href: 'https://www.patternfly.org/components/menus/select/',
    purpose: 'Uses selected, isOpen, onSelect, and onOpenChange. shouldFocusFirstItemOnOpen and shouldFocusToggleOnSelect configure focus. popperProps configures popup alignment and its container.',
  },
  {
    name: 'MenuToggle', href: 'https://www.patternfly.org/components/menus/menu-toggle/',
    purpose: 'Receives the ref supplied by Select, isExpanded, onClick, and the popup accessibility attributes. Its children display the purpose and active value, such as “Group by: Nation”.',
  },
  {
    name: 'SelectList', href: 'https://www.patternfly.org/components/menus/select/',
    purpose: 'Contains the options. Its unique id and accessible name connect it to the toggle through aria-controls and identify the list as Group by or Sort by.',
  },
  {
    name: 'SelectOption', href: 'https://www.patternfly.org/components/menus/select/',
    purpose: 'Maps each configured value and label to a PF6 option. PF6 renders the selected checkmark. Sort options add spoken labels such as “Departure ascending”.',
  },
]

export default function ImplementationNotes() {
  return (
    <Stack hasGutter className={styles.notes}>
      <StackItem>
        <Content>
          <h2>1. What this example demonstrates</h2>
          <p><strong>SearchOrganizationBar composes existing PatternFly 6 controls, with local styling for the joined Option 1 presentation.</strong> The library source is unchanged. The configured React core package is <code>@patternfly/react-core {packageJson.dependencies['@patternfly/react-core']}</code>.</p>
          <p>The same component serves two independent contexts: <strong>Group by Nation / Type</strong> in Routes and <strong>Sort by Departure / Arrival, ascending or descending</strong> in Movement Mission details. The purpose and current choice remain visible when the menu is closed.</p>
        </Content>
      </StackItem>
      <StackItem>
        <Content><h2>2. PF6 components and their configuration</h2></Content>
        <table className={styles.componentTable}>
          <caption>Building blocks of SearchOrganizationBar</caption>
          <thead><tr><th scope="col">PF6 component</th><th scope="col">Role and configuration in this example</th></tr></thead>
          <tbody>
            {components.map((component) => (
              <tr key={component.name}>
                <th scope="row"><a href={component.href} target="_blank" rel="noreferrer">{component.name.split(/(?=[A-Z])/).map((part, index) => (
                  <Fragment key={`${part}-${index}`}>{index > 0 && <wbr />}{part}</Fragment>
                ))}<span className="pf-v6-screen-reader"> documentation (opens in a new tab)</span></a></th>
                <td>{component.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </StackItem>
      <StackItem>
        <Content>
          <h2>3. Composition, state, and reuse</h2>
          <p>The search field and select remain separate controls inside one visual group:</p>
        </Content>
        <CodeBlock><CodeBlockCode>{`InputGroup
  InputGroupItem (isFill)
    TextInput (type="search")
  InputGroupItem
    Select
      MenuToggle
      SelectList → SelectOption[]`}</CodeBlockCode></CodeBlock>
        <Content>
          <p>The screen supplies <code>query</code>, <code>onQueryChange</code>, <code>value</code>, <code>onValueChange</code>, <code>label</code>, <code>options</code>, <code>searchLabel</code>, and <code>placeholder</code>. TypeScript connects option values to the selected value and change callback.</p>
          <p>The bar owns only the menu’s open/closed state. Its React code connects PF6 callbacks, closes the menu after selection, and generates unique IDs for each instance. RoutesPanel owns filtering, grouping, and route selection; the mission card owns its independent search text and sort choice. Data processing stays outside the reusable control.</p>
        </Content>
      </StackItem>
      <StackItem>
        <Content>
          <h2>4. Local style customization</h2>
          <p>All control styling changes live in <code>SearchOrganizationBar.module.css</code>. They apply to this composition, including its popup, rather than changing controls across the application.</p>
          <h3>Configuration through PF6 CSS variables</h3>
          <ul>
            <li><code>--pf-v6-c-input-group--Gap: 0</code> removes the standard separation.</li>
            <li>FormControl and MenuToggle border-radius variables round the outer corners and make the adjoining corners square.</li>
            <li>Control padding variables produce the compact sizing: 8px vertically, 16px horizontally for search, and 10px horizontally for the toggle. With the current 14px typography and line height, both controls measure 37px high.</li>
            <li><code>--pf-v6-c-menu-toggle--Gap: 3px</code> sets the caret spacing. Menu variables set 8px outer vertical padding, 4px vertical item padding, and the small corner radius.</li>
          </ul>
          <h3>Additional local CSS rules</h3>
          <ul>
            <li>A negative margin of one control-border width overlaps the adjacent borders, leaving a shared divider. PF6 does not expose a dedicated “joined search and select” option.</li>
            <li><code>:focus-within</code> and <code>z-index: 1</code> bring the active control above that shared border. No overflow clipping or focus-outline removal is applied.</li>
            <li>Flex sizing and minimum widths let search shrink while the toggle keeps its visible value. Long placeholder text uses an ellipsis; the toggle stays on one line.</li>
            <li>The purpose prefix uses the PF6 small text token (12px here). The active value uses <code>font-weight: 500</code> to match Medium text. The literal 10px padding, 3px gap, and weight 500 are explicit reference-specific choices.</li>
          </ul>
          <p>The joined appearance therefore combines <strong>exposed PF6 styling variables and additional local CSS</strong>. It is an application composition, rather than a standalone stock PF6 component.</p>
        </Content>
        <CodeBlock><CodeBlockCode>{`.bar {
  --pf-v6-c-input-group--Gap: 0;
}
.selectItem {
  margin-inline-start: calc(-1 * var(--pf-t--global--border--width--control--default));
}`}</CodeBlockCode></CodeBlock>
      </StackItem>
      <StackItem>
        <Content>
          <h2>5. Interaction, focus, and popup behavior</h2>
          <p>Search and the toggle have independent accessible names and keyboard focus. Enter or Space opens the toggle. A small application <code>onKeyDown</code> handler also opens a closed menu with Arrow Down; PF6 handles navigation among its options.</p>
          <p>PF6’s configured focus properties focus the first option on opening and the toggle after selection. The application’s <code>onSelect</code> callback updates the value and closes the menu. <code>onOpenChange</code> connects PF6’s outside-click, Escape, and Tab handling to the open state. Escape and Tab close the menu and return focus to the toggle; another Tab continues through the page.</p>
          <p>Sort arrows remain visible as ↑ / ↓, with explicit ascending/descending accessible labels. The popup uses PF6’s <code>popperProps</code>: end alignment, trigger width, a 4px distance, and <code>appendTo: () =&gt; document.body</code>. This lets it overlap the card and map without being clipped by their containers.</p>
        </Content>
      </StackItem>
      <StackItem>
        <Content>
          <h2>6. Verification and demo scope</h2>
          <p>Automated browser checks cover grouping changes, persistent selection and query, empty search results, all four sort choices, closed values, keyboard navigation, focus indicators, outside-click dismissal, joined-border geometry, and desktop/mobile layout. Manual checks also inspected open menus at a 320px viewport.</p>
          <p>Routes filter and regroup fictional fixtures. The mission card demonstrates input and selection state while keeping Mission summary and Mission legs as placeholders; it does not filter or sort mission data. The controls are independent and selecting a route does not open a mission.</p>
          <p>Run <code>npm run check</code> for lint, production build, and browser tests. The targeted checks are in <code>tests/search-organization.spec.ts</code>.</p>
          <h3>Source for developer review</h3>
          <ul>
            <li><a href={`${experimentRoot}components/SearchOrganizationBar.tsx`} target="_blank" rel="noreferrer">SearchOrganizationBar.tsx — composition and public props</a></li>
            <li><a href={`${experimentRoot}components/SearchOrganizationBar.module.css`} target="_blank" rel="noreferrer">SearchOrganizationBar.module.css — exposed variables and extra CSS</a></li>
            <li><a href={`${experimentRoot}organizationOptions.ts`} target="_blank" rel="noreferrer">organizationOptions.ts — typed Group / Sort choices</a></li>
            <li><a href={`${experimentRoot}components/RoutesPanel.tsx`} target="_blank" rel="noreferrer">RoutesPanel.tsx — filtering, grouping, and selection</a></li>
            <li><a href={`${experimentRoot}components/MovementMissionDetailsCard.tsx`} target="_blank" rel="noreferrer">MovementMissionDetailsCard.tsx — independent control state</a></li>
            <li><a href={`${sourceRoot}tests/search-organization.spec.ts`} target="_blank" rel="noreferrer">search-organization.spec.ts — browser checks</a></li>
          </ul>
          <p>Repository links open the develop branch in a new tab; local changes are available there after they are pushed. The component links in the table open the official PatternFly documentation.</p>
        </Content>
      </StackItem>
    </Stack>
  )
}
