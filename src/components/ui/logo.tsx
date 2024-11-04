import Image from "next/image";

export default function Logo() {
    return (
      <div className="flex justify-between items-center self-stretch px-1 py-4">
        <div className="w-[86px] flex">
          <div className="w-[86px] h-8">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/chat.png"
                alt="Chat icon"
                width={24}
                height={24}
                className="w-5 h-5"
              />
              <span className="font-bold text-base text-neutral-900">
                Chat AI
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }