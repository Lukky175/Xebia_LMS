/*
==========================================================
Multi Select

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Reusable multi-select dropdown component that
supports selecting multiple values from a list.

Responsibilities

• Display selectable options.
• Support multiple selection.
• Display selected values as chips.
• Filter options using search.
• Close automatically on outside click.
• Notify parent when selection changes.

Features

✓ Controlled Component
✓ Search
✓ Multi Selection
✓ Chips
✓ Remove Chips
✓ Click Outside Close
✓ Keyboard Friendly (Future)

Architecture

Parent Component

        │

        ▼

MultiSelect

        │

        ▼

Selected IDs

        │

        ▼

Parent State

Notes

This component never owns the selected data.

The parent component is responsible for
maintaining the selected values.

Future Enhancements

• API Search
• Infinite Scroll
• Virtualized Lists
• Keyboard Navigation
• Select All
• Clear All
==========================================================
*/

/* ============================
   React Hooks
============================ */
import {
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";

/* ============================
   Styles
============================ */
import styles from "./MultiSelect.module.css";

/* ============================
   Icons
============================ */
import {
    FiChevronDown,
    FiCheck,
    FiSearch,
    FiX
} from "react-icons/fi";


/**
 * MultiSelect
 *
 * Generic reusable multi-select dropdown.
 *
 * Props
 * -----
 * label
 *      Input label.
 *
 * placeholder
 *      Placeholder text.
 *
 * options
 *      Available options.
 *
 * value
 *      Selected option IDs.
 *
 * onChange
 *      Called whenever the selection changes.
 *
 * Returns
 * -------
 * JSX.Element
 */
export default function MultiSelect({
    label,
    placeholder,
    options = [],
    value = [],
    onChange
}) {
    /*
    Reference to the entire component.

    Used to determine whether a mouse click
    occurred inside or outside the dropdown.
    */
    const wrapperRef = useRef(null);
    /* ==========================================
        Component State

        open
            Controls dropdown visibility.

        search
            Stores the user's search query.

        ========================================== */
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    /* ==========================================
    Outside Click Detection

    Automatically closes the dropdown when
    the user clicks outside the component.

    Event listener is removed when the
    component unmounts to prevent memory leaks.
    ========================================== */

    useEffect(() => {
        const handler = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setOpen(false);
                setSearch("");
            }
        };

        window.addEventListener(
            "mousedown",
            handler
        );

        return () =>
            window.removeEventListener(
                "mousedown",
                handler
            );
    }, []);

    /* ==========================================
    Search Filtering

    Filter available options using the
    current search query.

    useMemo prevents unnecessary filtering
    during unrelated component renders.
    ========================================== */

    const filteredOptions = useMemo(() => {
        return options.filter(
            option =>
                option.label
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );
    },

    [
        options,
        search
    ]);

    /* ==========================================
    Option Lookup Map

    Creates a lookup table for quick access
    to options by their ID.

    This avoids repeatedly searching through
    the options array when rendering chips.
    ========================================== */

    const optionMap = useMemo(() => {

        return new Map(

            options.map(option => [

                option.id,

                option

            ])

        );

    }, [options]);

/* ==========================================
   Toggle Selection

   Adds or removes an option from the
   current selection.

   If the option already exists

       Remove it

   Otherwise

       Add it

   The updated selection is passed back
   to the parent component.
========================================== */

    const toggleItem = (id) => {
        const exists = value.includes(id);
        if (exists) {
            onChange(
                value.filter(
                    item => item !== id
                )
            );
        }
        else {
            onChange(
                [
                    ...value,
                    id
                ]
            );
        }
    };

    /*
    ==========================================================
    Component Layout

    Label
    ↓
    Selected Chips
    ↓
    Select Button
    ↓
    Dropdown
    ↓
    Search
    ↓
    Options

    ==========================================================
    */
    return (
        <div
            className={styles.container}
            ref={wrapperRef}
        >
            <label>
                {label}
            </label>
            {/* ==========================================
                Selected Values

                Display each selected option as a
                removable chip.
                ========================================== */}
            {
                value.length > 0 &&
                <div className={styles.selectedContainer}>
                    {
                        value.map(id => {
                            const item = optionMap.get(id);
                            if (!item) return null;
                            return (
                                <div
                                    key={id}
                                    className={styles.chip}
                                >
                                    {item.label}
                                    {/* Remove this item from the current selection. */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleItem(id)
                                        }
                                    >
                                        <FiX/>
                                    </button>
                                </div>
                            );
                        })
                    }
                </div>
            }
            {/* ==========================================
                    Dropdown Trigger

                    Opens and closes the option list.

                    Displays either

                    • Placeholder

                    • Number of selected items
                ========================================== */}
            <button
                type="button"
                className={styles.select}
                onClick={() =>
                    setOpen(
                        previous => !previous
                    )
                }
            >
            <span>
                {
                    value.length === 0
                        ? placeholder
                        : `${value.length} ${
                            value.length === 1
                                ? "item"
                                : "items"
                        } selected`
                }
            </span>
                <FiChevronDown
                    className={
                        open
                            ? styles.rotate
                            : ""
                    }
                />
            </button>

            {/* ==========================================
                    Dropdown Panel

                    Displays searchable list of all
                    available options.
                ========================================== */}

            {
                open &&
                <div className={styles.dropdown}>

                    {/* Search available options by label. */}
                    <div className={styles.searchBox}>
                        <FiSearch/>
                        <input
                            placeholder="Search..."
                            value={search}
                            onChange={(event)=>
                                setSearch(
                                    event.target.value
                                )
                            }
                        />

                    </div>

                    {/* Render every option matching the current search query. */}

                    {
                        filteredOptions.length === 0
                            ? (
                                <div className={styles.empty}>
                                    No results found
                                </div>
                            )
                            : (
                                filteredOptions.map((option) => (

                                    <button

                                        key={option.id}

                                        type="button"

                                        className={styles.option}

                                        onClick={() =>

                                            toggleItem(option.id)

                                        }

                                    >

                                        <span>

                                            {option.label}

                                        </span>

                                        {

                                            value.includes(option.id) &&

                                            <FiCheck />

                                        }

                                    </button>

                                ))
                            )
                    }
                </div>
            }
        </div>
    );
}