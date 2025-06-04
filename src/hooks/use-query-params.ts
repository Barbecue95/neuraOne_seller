"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const router = useRouter();
  const currentPathname = usePathname();
  const searchParams = useSearchParams();

  const getParam = (key: string) => {
    return searchParams.get(key);
  };

  const setParam = (key: string, value: string, pathname = currentPathname) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const setParams = (
    values: Record<string, string>,
    pathname = currentPathname,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(values).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const deleteParam = (key: string, pathname = currentPathname) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearParams = (pathname = currentPathname) => {
    router.replace(`${pathname}`, { scroll: false });
  };

  const navigate = (pathname: string, values: Record<string, string> = {}) => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      params.set(key, value);
    });
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  };

  return {
    getParam,
    setParam,
    setParams,
    deleteParam,
    clearParams,
    navigate,
  };
}
