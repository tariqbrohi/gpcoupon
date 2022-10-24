import AppHeader from "@/layouts/AppHeader";
import AppMain from "@/layouts/AppMain";
import Head from "@/modules/components/Head";
import SearchItemList from "./SearchItemList";

export default function SearchResult() {

    return (
        <>
            <Head title="GPcoupon | Search Result" />
            <AppHeader bgTransition hideOnMobile={false} />
            <AppMain>
                <section style={{padding: "50px 12%"}}>
                    <SearchItemList />
                </section>
            </AppMain>
        </>
    );
}