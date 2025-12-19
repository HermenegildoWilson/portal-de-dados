import * as React from "react";
import { useSensors } from "../hooks/useSensors";
import PageTitle from "../components/typography/PageTitle";
import MySensorDisplay from "../components/chart/MySensorDisplay";

export default function Main() {
    const { sensors } = useSensors();

    return (
        <>
            <PageTitle Title={"Monitorização Ambiental em Tempo Real"} />
            <MySensorDisplay chartsData={sensors} />
        </>
    );
}
