import HomeDesktop from "./HomeDesktop";
import HomeMobile from "./HomeMobile";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function HomePage() {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    return isDesktop ? <HomeDesktop /> : <HomeMobile />;
}