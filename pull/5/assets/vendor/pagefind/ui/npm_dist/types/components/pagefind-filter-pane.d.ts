import { PagefindElement } from "./base-element";
import { Instance } from "../core/instance";
import type { FilterCounts } from "../types";
type SortOption = "default" | "alphabetical" | "count-desc" | "count-asc";
interface FilterElementRefs {
    label: HTMLLabelElement;
    countSpan: HTMLSpanElement;
    checkbox: HTMLInputElement;
}
interface GroupElementRefs {
    group: HTMLElement;
    optionsContainer: HTMLElement;
    selectedCountSpan: HTMLSpanElement | null;
}
export declare class PagefindFilterPane extends PagefindElement {
    static get observedAttributes(): string[];
    containerEl: HTMLElement | null;
    showEmpty: boolean;
    expanded: boolean;
    openFilters: string[];
    sortOption: SortOption;
    autoOpenThreshold: number;
    selectedFilters: Record<string, Set<string>>;
    availableFilters: FilterCounts | null;
    totalFilters: FilterCounts | null;
    filterElements: Map<string, FilterElementRefs>;
    groupElements: Map<string, GroupElementRefs>;
    groupVisibleCounts: Map<string, number>;
    isRendered: boolean;
    constructor();
    init(): void;
    private sortValues;
    render(): void;
    getSelectedText(count: number): string;
    shouldGroupStartOpen(filterName: string, valueCount: number, filterCount: number): boolean;
    hasStructureChanged(): boolean;
    handleFiltersUpdate(): void;
    renderFilters(): void;
    updateFilters(): void;
    renderFilterGroup(filterName: string, values: Record<string, number>, availableValues: Record<string, number>, filterCount: number): HTMLElement | null;
    renderCheckbox(container: HTMLElement, filterName: string, value: string, count: number, isSelected: boolean, shouldShow: boolean): void;
    handleCheckboxChange(filterName: string, value: string, checked: boolean): void;
    register(instance: Instance): void;
    update(): void;
}
export {};
