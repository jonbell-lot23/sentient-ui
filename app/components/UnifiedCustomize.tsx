"use client";
import { useState, useEffect } from "react";
import { CustomizeInput } from "./CustomizeInput";
import { useNav as useSideNav } from "../nav-context";
import { useNav as useHamburgerNav } from "../hamburger-nav-context";

export function UnifiedCustomize() {
  const { nav: sideNav, update: updateSide, reset: resetSide } = useSideNav();
  const { nav: hamburgerNav, update: updateHamburger, reset: resetHamburger } = useHamburgerNav();
  const [currentContext, setCurrentContext] = useState<"sidebar" | "hamburger" | null>(null);
  const [highlightedItems, setHighlightedItems] = useState<{ id: string; action: string; context: string }[]>([]);
  const [removingItems, setRemovingItems] = useState<{ id: string; context: string }[]>([]);

  // Apply highlighting classes to DOM elements
  useEffect(() => {
    // Clear all existing highlights
    document.querySelectorAll('.highlight-remove, .highlight-move, .nav-item-removing').forEach(el => {
      el.classList.remove('highlight-remove', 'highlight-move', 'nav-item-removing');
    });

    // Apply new highlights
    highlightedItems.forEach(item => {
      const selector = item.context === 'sidebar' 
        ? `[data-item-id="sidebar-${item.id}"]`
        : `[data-item-id="hamburger-${item.id}"]`;
      
      const element = document.querySelector(selector);
      if (element) {
        if (item.action === 'remove') {
          element.classList.add('highlight-remove');
        } else if (item.action === 'move') {
          element.classList.add('highlight-move');
        }
      }
    });

    // Apply removing animation
    removingItems.forEach(item => {
      const selector = item.context === 'sidebar' 
        ? `[data-item-id="sidebar-${item.id}"]`
        : `[data-item-id="hamburger-${item.id}"]`;
      
      const element = document.querySelector(selector);
      if (element) {
        element.classList.add('nav-item-removing');
      }
    });
  }, [highlightedItems, removingItems]);

  const handleCustomize = async (prompt: string) => {
    // Get items to remove
    const itemsToRemove = highlightedItems.filter(h => h.action === 'remove');
    
    // Mark items as removing (triggers animation)
    setRemovingItems(itemsToRemove.map(h => ({ id: h.id, context: h.context })));
    
    // Wait for animation then remove
    setTimeout(() => {
      const sidebarItems = itemsToRemove
        .filter(h => h.context === 'sidebar')
        .map(h => h.id);
      
      const hamburgerItems = itemsToRemove
        .filter(h => h.context === 'hamburger')
        .map(h => h.id);

      // Update both contexts as needed
      if (sidebarItems.length > 0) {
        console.log('[UnifiedCustomize] Updating sidebar with hidden:', sidebarItems);
        updateSide({ hidden: sidebarItems });
      }
      if (hamburgerItems.length > 0) {
        console.log('[UnifiedCustomize] Updating hamburger with hidden:', hamburgerItems);
        updateHamburger({ hidden: hamburgerItems });
      }
      
      setRemovingItems([]);
    }, 800); // Match animation duration

    // Send to API
    const res = await fetch("/api/customise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        prompt, 
        context: currentContext || "sidebar"
      }),
    });
    const data = await res.json();
    
    // Apply API response
    if (!data.error) {
      if (data.sidebarUpdate) updateSide(data.sidebarUpdate);
      if (data.hamburgerUpdate) updateHamburger(data.hamburgerUpdate);
    }
  };

  const parseInputForHighlights = (input: string) => {
    const lower = input.toLowerCase();
    const highlights: { id: string; action: string; context: string }[] = [];
    
    const isRemove = /remove|delete|hide/.test(lower);
    const isMove = /move|reorder|put/.test(lower);
    
    // Check sidebar items
    sideNav.forEach(item => {
      if (lower.includes(item.label.toLowerCase()) || lower.includes(item.id.toLowerCase())) {
        highlights.push({
          id: item.id,
          action: isRemove ? 'remove' : isMove ? 'move' : 'default',
          context: 'sidebar'
        });
      }
    });
    
    // Check hamburger items
    hamburgerNav.forEach(item => {
      // More flexible matching - handle "item 1" or "item1"
      const labelNormalized = item.label.toLowerCase().replace(/\s+/g, '');
      const inputNormalized = lower.replace(/\s+/g, '');
      
      if (lower.includes(item.label.toLowerCase()) || 
          lower.includes(item.id.toLowerCase()) ||
          inputNormalized.includes(labelNormalized) ||
          inputNormalized.includes(item.id.toLowerCase())) {
        console.log('[UnifiedCustomize] Found hamburger match:', item.id, item.label);
        highlights.push({
          id: item.id,
          action: isRemove ? 'remove' : isMove ? 'move' : 'default',
          context: 'hamburger'
        });
      }
    });
    
    setHighlightedItems(highlights);
    
    // Update context based on what's being targeted
    if (highlights.length > 0) {
      const contexts = [...new Set(highlights.map(h => h.context))];
      setCurrentContext(contexts.includes('hamburger') ? 'hamburger' : 'sidebar');
    }
  };

  const handleReset = () => {
    resetSide();
    resetHamburger();
    setHighlightedItems([]);
    setRemovingItems([]);
  };

  const handleExpand = (expanded: boolean) => {
    if (expanded) {
      // Always open hamburger menu when gear is clicked
      document.dispatchEvent(new CustomEvent('openHamburgerMenu'));
    }
  };

  return (
    <CustomizeInput
      onSubmit={handleCustomize}
      onReset={handleReset}
      context={currentContext || "sidebar"}
      onInputChange={parseInputForHighlights}
      onExpand={handleExpand}
      position="bottom-center"
    />
  );
}