export default function LoadingSkeleton() {
    return (
      <div className="global-container">
        <div className="left-container">
          {/* Logo skeleton */}
          <div className="flex justify-between items-center self-stretch px-1 py-4">
            <div className="animate-pulse flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
  
          {/* New chat button skeleton */}
          <div className="animate-pulse px-3">
            <div className="flex items-center gap-2 h-10 bg-gray-100 rounded-lg">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
  
          {/* Chat list skeleton */}
          <div className="flex-1 overflow-y-auto px-1 mt-4 space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex items-center gap-2 p-2">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-100 w-full">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
  
          {/* User profile skeleton */}
          <div className="animate-pulse flex flex-col gap-2 self-stretch p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
  
        <div className="right-container">
          {/* Chat messages skeleton */}
          <div className="flex-1 overflow-y-auto">
            <div className="min-h-[60vh] flex flex-col justify-end p-4">
              <div className="animate-pulse space-y-8">
                {/* User message skeleton */}
                <div className="flex justify-end">
                  <div className="bg-indigo-50 rounded-lg p-4 max-w-[80%]">
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                  </div>
                </div>
  
                {/* AI message skeleton */}
                <div className="flex justify-start">
                  <div className="bg-gray-50 rounded-lg p-4 max-w-[80%] space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-64"></div>
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
  
                {/* User message skeleton */}
                <div className="flex justify-end">
                  <div className="bg-indigo-50 rounded-lg p-4 max-w-[80%]">
                    <div className="h-4 bg-gray-200 rounded w-56"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Chat input skeleton */}
          <div className="p-4 border-t border-neutral-200">
            <div className="animate-pulse flex items-center gap-4">
              <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }