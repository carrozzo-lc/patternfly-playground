import { useId, useState } from 'react'
import { InputGroup, InputGroupItem, MenuToggle, Select, SelectList, SelectOption, TextInput } from '@patternfly/react-core'
import styles from './SearchOrganizationBar.module.css'

export interface OrganizationOption<Value extends string> {
  value: Value
  label: string
  /** Expands symbols such as ↑ / ↓ into spoken direction names. */
  accessibleLabel?: string
}

interface SearchOrganizationBarProps<Value extends string> {
  searchLabel: string
  placeholder: string
  query: string
  onQueryChange: (query: string) => void
  label: 'Group by' | 'Sort by'
  value: Value
  options: readonly OrganizationOption<Value>[]
  onValueChange: (value: Value) => void
}

/** A composition of PF6 controls; query and selected value belong to the consumer. */
export function SearchOrganizationBar<Value extends string>({
  searchLabel, placeholder, query, onQueryChange, label, value, options, onValueChange,
}: SearchOrganizationBarProps<Value>) {
  const id = useId()
  const [isOpen, setIsOpen] = useState(false)
  const selected = options.find((option) => option.value === value)

  return (
    <InputGroup className={styles.bar} role="group" aria-label={`${searchLabel} and organize results`}>
      <InputGroupItem isFill className={styles.searchItem}>
        <TextInput
          id={`${id}-search`}
          type="search"
          aria-label={searchLabel}
          placeholder={placeholder}
          value={query}
          onChange={(_event, nextQuery) => onQueryChange(nextQuery)}
          className={styles.search}
        />
      </InputGroupItem>
      <InputGroupItem className={styles.selectItem}>
        <Select
          className={styles.menu}
          isOpen={isOpen}
          selected={value}
          onOpenChange={setIsOpen}
          shouldFocusFirstItemOnOpen
          shouldFocusToggleOnSelect
          onSelect={(_event, nextValue) => {
            const option = options.find((candidate) => candidate.value === nextValue)
            if (option) onValueChange(option.value)
            setIsOpen(false)
          }}
          popperProps={{ position: 'end', width: 'trigger', distance: 4, appendTo: () => document.body }}
          toggle={(toggleRef) => (
            <MenuToggle
              ref={toggleRef}
              className={styles.toggle}
              isExpanded={isOpen}
              aria-label={`${label}: ${selected?.accessibleLabel ?? selected?.label ?? value}`}
              aria-haspopup="listbox"
              aria-controls={isOpen ? `${id}-options` : undefined}
              onClick={() => setIsOpen((open) => !open)}
              onKeyDown={(event) => {
                if (!isOpen && event.key === 'ArrowDown') {
                  event.preventDefault()
                  setIsOpen(true)
                }
              }}
            >
              <span className={styles.prefix}>{label}:</span>{' '}
              <span className={styles.value}>{selected?.label ?? value}</span>
            </MenuToggle>
          )}
        >
          <SelectList id={`${id}-options`} aria-label={label}>
            {options.map((option) => (
              <SelectOption key={option.value} value={option.value} aria-label={option.accessibleLabel}>
                {option.label}
              </SelectOption>
            ))}
          </SelectList>
        </Select>
      </InputGroupItem>
    </InputGroup>
  )
}
