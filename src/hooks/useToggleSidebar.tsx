import { useCallback } from "react";

export default function useToggleSidebar() {
  const toggleSidebar = useCallback(() => {
    document.body.classList.toggle("open-sidebar");
  }, []);

  const closeSidebar = useCallback(() => {
    if (document.body.classList.contains("open-sidebar")) {
      document.body.classList.remove("open-sidebar");
    }
  }, []);

  return { toggleSidebar, closeSidebar };
}
