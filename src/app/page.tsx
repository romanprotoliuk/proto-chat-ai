import Image from 'next/image';

export default function Home() {
  return (
    // main containter
    <div className="global-container">
      {/* left sidebar */}
      <div className="left-container">
        
        {/* Logo */}
        <div className="flex justify-between items-center self-stretch px-1 py-4">
          <div className="w-[86px] flex">
            <div className="w-[86px] h-8">
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Image src="/icons/chat.png" alt="Chat icon" width={24} height={24} className="w-5 h-5" />
                <span className="font-bold text-base text-neutral-900">
                  Chat AI
                </span>
              </div>
              <div className="flex">
                <div className="w-8 h-8 rounded-lg"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 rounded opacity-0">
            <div className="w-5 h-5">
              <div className="w-[16.666667938232422px] h-[16.666667938232422px]">
                <svg className="w-[8.838805198669434px] h-[8.838805198669434px] text-neutral-600"></svg>
              </div>
            </div>
          </div>
        </div>

        {/* chat history */}
        <div className="flex flex-col gap-4 self-stretch grow">
          <div className="flex flex-col gap-3 self-stretch grow">
            <div className="flex flex-col self-stretch bg-neutral-50 rounded">
              <div className="flex items-center gap-2 self-stretch p-1.5 rounded-tr-lg rounded-br-lg">
                <div style={{display: 'flex', alignItems: 'left', gap: '8px'}}>
                  
                  <Image 
                    src="/icons/flashlight-line.png" 
                    alt="Lightning icon" 
                    width={20}
                    height={40}
                  />
                  <span className="font-medium text-sm text-indigo-700">
                    Ongoing prompt
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* user avatar */}
        <div className="flex flex-col gap-2 self-stretch pt-4">
          <div className="flex items-center gap-3 self-stretch p-2 rounded">
            <div className="w-6 h-6">
              <img className="w-6 h-6 object-cover"></img>
            </div>
            <div className="flex flex-col gap-0.5 grow">
              <span className="font-semibold text-sm text-neutral-900">
                Sarah Dole
              </span>
            </div>
            <div className="flex justify-center items-center gap-1 rounded">
              <div className="w-5 h-5">
                <svg className="w-[15.833333015441895px] h-[16.666667938232422px] text-neutral-700"></svg>
              </div>
            </div>
          </div>
        </div>

        {/* bottom section for account creation */}
        <div className="flex flex-col gap-4 self-stretch">
          <div className="flex items-center gap-1 self-stretch bg-white px-3.5 py-2.5 rounded border-[0.5px] border-solid border-neutral-200">
            <div className="w-5 h-5">
              <div className="w-[16.666667938232422px] h-[16.666667938232422px]">
                <svg className="w-[15.596053123474121px] h-[14.988396644592285px] text-neutral-900"></svg>
              </div>
            </div>
            <div className="flex justify-center items-center px-0.5">
              <span className="font-medium text-sm text-neutral-900">
                Start new chat
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-6 self-stretch bg-white p-4 rounded-lg border border-solid border-neutral-200">
            <div className="flex flex-col gap-1 self-stretch">
              <div className="flex items-center self-stretch">
                <span className="font-medium text-sm text-neutral-900">
                  Let’s create an account
                </span>
              </div>
              <span className="font-normal text-xs text-neutral-600">
                Save your chat history, share chat, and personalize your
                experience.
              </span>
            </div>
            <div className="flex flex-col gap-1 self-stretch">
              <div className="flex justify-center items-center gap-1 self-stretch bg-indigo-700 px-3 py-2 rounded">
                <div className="flex justify-center items-center px-0.5">
                  <span className="font-medium text-sm text-white">
                    Sign in
                  </span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-1 self-stretch px-3 py-2 rounded">
                <div className="flex justify-center items-center px-0.5">
                  <span className="font-medium text-sm text-indigo-700">
                    Create account
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* main content */}
      <div className="right-container">
        <div className="flex flex-col items-center gap-10 self-stretch grow pt-20 pb-6">
          <div className="flex flex-col grow">
            <div className="flex flex-col gap-20 grow">
              <div className="flex justify-center items-center">
                <span className="text-3xl">
                  Hey, I’m Chat AI. Your AI assistant and companion for any
                  occasion.
                </span>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-6 bg-white p-4 rounded-lg border border-solid border-neutral-200">
                  <div className="flex justify-center items-center bg-indigo-50 p-2 rounded-lg">
                    <div className="w-6 h-6">
                      <svg className="w-5 h-[19.833782196044922px] text-indigo-700"></svg>
                    </div>
                  </div>
                  <div className="w-[134px] flex flex-col gap-2">
                    <span className="font-semibold text-sm text-neutral-900">
                      Draft email
                    </span>
                    <span className="font-normal text-xs text-neutral-600">
                      Generate email for any occasion you need.
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-6 bg-white p-4 rounded-lg border border-solid border-neutral-200">
                  <div className="flex justify-center items-center bg-green-50 p-2 rounded-lg">
                    <div className="w-6 h-6">
                      <svg className="w-[17.9705753326416px] h-[17.97056770324707px] text-green-700"></svg>
                    </div>
                  </div>
                  <div className="w-[134px] flex flex-col gap-2">
                    <span className="font-semibold text-sm text-neutral-900">
                      Write an Essay
                    </span>
                    <span className="font-normal text-xs text-neutral-600">
                      Generate essay for any occasion you need.
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-6 bg-white p-4 rounded-lg border border-solid border-neutral-200">
                  <div className="flex justify-center items-center bg-fuchsia-50 p-2 rounded-lg">
                    <div className="w-6 h-6">
                      <svg className="w-5 h-[18px] text-fuchsia-600"></svg>
                    </div>
                  </div>
                  <div className="w-[134px] flex flex-col gap-2">
                    <span className="font-semibold text-sm text-neutral-900">
                      Planning
                    </span>
                    <span className="font-normal text-xs text-neutral-600">
                      Plan for any occasion, from holiday to family.
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-6 bg-white p-4 rounded-lg border border-solid border-neutral-200">
                  <div className="flex justify-center items-center bg-amber-50 p-2 rounded-lg">
                    <div className="w-6 h-6">
                      <svg className="w-5 h-[19.5px] text-orange-500"></svg>
                    </div>
                  </div>
                  <div className="w-[134px] flex flex-col gap-2">
                    <span className="font-semibold text-sm text-neutral-900">
                      Assistant
                    </span>
                    <span className="font-normal text-xs text-neutral-600">
                      Become your personal assistant. Helping you.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[710px] flex gap-2">
              <div className="flex flex-col gap-1.5 grow h-10">
                <div className="flex flex-col gap-1.5 self-stretch grow">
                  <div className="flex gap-2 self-stretch grow bg-neutral-50 px-3.5 py-3 rounded-lg border border-solid border-neutral-200">
                    <span className="font-normal text-sm text-neutral-500">
                      Ask me anything...
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-1 bg-neutral-100 px-3.5 py-2.5 rounded">
                <div className="w-5 h-5">
                  <div className="w-[16.666667938232422px] h-[16.666667938232422px]">
                    <svg className="w-[14.034780502319336px] h-[14.016934394836426px] text-neutral-400"></svg>
                  </div>
                </div>
                <div className="flex justify-center items-center px-0.5">
                  <span className="font-medium text-sm text-neutral-400">
                    Submit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
