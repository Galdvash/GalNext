// "use client";

export function Loader() {
  return (
    <div className=" absolute top-0 bottom-0 inset-x-0 flex items-center justify-center min-w-full min-h-[calc(100svh)]">
      <div className="flex items-center justify-center w-full h-32">
        <div className="w-32 h-32 border-t-2 border-b-2 rounded-full animate-spin border-primary"></div>
      </div>
    </div>
  );
}
