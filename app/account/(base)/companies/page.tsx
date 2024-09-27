"use client";
import { useAppDispatch, useAppSelector } from "@/app/_store/hooks";
import { MutatingDots } from "react-loader-spinner";
import { useTranslations } from "next-intl";
import { Badge } from "flowbite-react";
import { Konect } from "@/app/_core/models/Konect";
import { formatDistanceToNow } from "date-fns";
import { TbBuildingCommunity, TbCheck, TbDownload, TbMap2, TbMapPin2, TbTrash, TbUsers, TbX } from "react-icons/tb";
import { generateVCard, ucfirst } from "@/app/_core/utils/functions";
import { useEffect } from "react";
import { getUserCompanies } from "@/app/_store/slices/authSlice";
import { HiOfficeBuilding } from "react-icons/hi";
import Company from "@/app/_core/models/Company";
import Link from "next/link";
import { companyRoute } from "@/app/_core/config/routes";


interface CompaniesPage {

}

export default function CompaniesPage({
}: CompaniesPage) {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.currentUser);
    const __ = useTranslations("Text");

    useEffect(() => {
        if (user?.companies === undefined) {
            dispatch(getUserCompanies());
        } else {
        }
    }, [user, dispatch]);

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
        user && (
            <section className="lg:pt-12 md:pt-4  pt-4">
                <div className="lg:py-0 md:py-3 py-0 mb-5">
                    <h2
                        style={{ whiteSpace: "pre-wrap" }}
                        className="text-2xl font-semibold"
                    >
                        {__("my_connections")}
                    </h2>

                    <div className="w-14 h-1 mt-2 bg-gray-400"></div>

                    {/* <p className="text-gray-300/85 text-sm mt-4 font-light">
                    {TLabels("take_control")}
                </p> */}
                </div>
                <div className="lg:col-span-6 col-span-8 md:space-y-6 space-y-4">
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        {user?.companies?.map((company: Company, i) => {
                            // console.log(konect);
                            return (
                                <div
                                    className="flex space-y-1 flex-col bg-white p-4 rounded-md border"
                                    key={i}
                                >
                                    <div className="flex justify-between">
                                        <h3 className="flex space-x-2 items-center">
                                            <span>
                                                <TbBuildingCommunity />
                                            </span>
                                            <Link href={`${companyRoute.path}/${company.name}/home`} className="font-medium hover:underline">{`${ucfirst(company.name)}`}</Link>
                                        </h3>
                                        <span>
                                            <span className="flex space-x-2 items-center">
                                                <Badge
                                                    icon={TbUsers}
                                                    className="text-xs"
                                                    color="gray"
                                                >
                                                    {`${company.members?.length}`}
                                                </Badge>
                                                <span className="bg-gray-100 cursor-pointer p-1 rounded-full " onClick={() => {

                                                }}>
                                                    <TbTrash className="text-gray-500 hover:text-gray-800" />
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                    {/* <span className="text-gray-300 text-sm font-normal w-max">
                                        {time}
                                    </span> */}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        )
    );
}
