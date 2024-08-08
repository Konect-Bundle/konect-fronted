"use client";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
} from "react-simple-maps";
import { useAppSelector } from "@/app/_store/hooks";
import { useTranslations } from "next-intl";
import { MutatingDots } from "react-loader-spinner";
import { ucfirst } from "@/app/_core/utils/functions";
export interface IDashboardPageProps {}

export default function DashboardPage(props: IDashboardPageProps) {
    const user = useAppSelector((state) => state.auth.currentUser);
    const __ = useTranslations("Profile");
    const __t = useTranslations("Text");
    const geoUrl =
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

    if (!user)
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <MutatingDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#e4dc1a"
                    secondaryColor="#e4dc1a"
                    radius="12.5"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        );

    return (
        <>
            <div className="py-6 space-y-2">
                <h2 className="font-bold text-2xl">
                    {__("Dashboard.dashboard_hello", {
                        name: ucfirst(user.firstname!),
                    })}
                </h2>
                <p className="text-gray-600">
                    {__t("enjoy_a_quick_and_comprehensive_overview")}
                </p>
            </div>
            <div className="grid gap-3 grid-cols-11">
                <div className="rounded-lg border border-noir-medium/35 bg-white mb-4 md:mt-0 mt-2 lg:col-span-7 col-span-11 py-4">
                    <div className="border-b border-noir-medium/35 mb-6 p-4">
                        <h5 className="leading-none text-xl font-semibold text-gray-900 pb-2">
                            {__t("geographical_overview")}
                        </h5>
                        <p className="text-md font-normal text-gray-500">
                            {__t(
                                "visualize_the_geographic_areas_you_have_touched",
                            )}
                        </p>
                    </div>
                    <ComposableMap height={455}>
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        style={{
                                            default: {
                                                fill: "#f6f6f6",
                                                stroke: "#dcdcdc",
                                            },
                                            hover: {
                                                fill: "#f6f6f6",
                                            },
                                            pressed: {
                                                fill: "#f6f6f6",
                                            },
                                        }}
                                    />
                                ))
                            }
                        </Geographies>
                        <Marker
                            coordinates={[-74.006, 40.7128]}
                            className="animate-pulse"
                        >
                            <circle r={8} fill="#0f0f0f" />
                        </Marker>
                    </ComposableMap>
                </div>

                <div className="lg:col-span-4 col-span-11"></div>
            </div>
        </>
    );
}
