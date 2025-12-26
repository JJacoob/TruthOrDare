import { ThemeToggle } from "@/components/templates/buttons/ThemeToggle";
import { GameActions } from "@/components/templates/GameActions";
import { GamePrompt } from "@/components/templates/GamePrompt";

export default function GamePage() {
  return (
          <div
                className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    bg-[var(--bg-page)]
                    text-[var(--text-primary)]
                "
            >
                <div 
                    className="
                        w-full
                        max-w-3xl
                        mx-auto
                        rounded-xl
                        border
                        border-[var(--border-color)]
                        bg-[var(--bg-box)]
                        p-4
                        sm:p-6
                        shadow-xs
                        flex
                        flex-col
                        h-full
                        max-[769px]:h-screen
                        max-[769px]:rounded-none
                        max-[769px]:border-none
                    ">
                    <GameActions />
                    <GamePrompt />
                </div>
                <ThemeToggle type="fab" />
            </div>
  );
}
