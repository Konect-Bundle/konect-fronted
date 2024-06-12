"use client";
import KuserHeader from "@/app/_components/KuserHeader";
import { UserService } from "@/app/_core/api/services/UserService";
import { esser, ucfirst } from "@/app/_core/utils/functions";
import Image from "next/image";
import { kuser } from "../../_core/config/routes";
import Link from "next/link";
import {TbArrowForwardUpDouble, TbExternalLink, TbMail, TbPhone, TbShape3, TbShare3, TbUsersPlus} from "react-icons/tb";
import { MdLocationPin } from "react-icons/md";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { useEffect, useState } from "react";
import ImageSkeleton from "@/app/_components/Common/Skeleton/ImageSkeleton";
import TextSkeleton from "@/app/_components/Common/Skeleton/TextSkeleton";
import VideoSkeleton from "@/app/_components/Common/Skeleton/VideoSkeleton";
import ExternalLinkSkeleton from "@/app/_components/Common/Skeleton/ExternalLinkSkeleton";
import {Button} from "flowbite-react";
import {customButtonTheme} from "@/app/_styles/flowbite/button";


export default function KuserPage({ params }: { params: { uuid: string } }) {
  const [kuser, setKuser] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    UserService.getUser(params.uuid).then((rs) => {

      setKuser(rs.data);
      setLoading(false);
    });
  }, []);

  var vinfo = kuser && kuser.vinfo;
  // Object.keys(vinfo.socialProfils).map((so) => {
  //   console.log(so, key);
  // })
  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No profile data</p>
  return (
    <div className="h-screen py-4">
      <KuserHeader />

      <div className="grid grid-cols-12 gap-2 h-full w-screen bg-gray-100">
        <div className="flex flex-col lg:col-span-4 sm:col-span-6 col-span-12 px-4">
          <div className="relative py-4 flex flex-col items-center justify-start mt-32 mb-2 h-full bg-white rounded-lg space-y-3 md:space-y-6 px-6 border">
            <span className="absolute -top-24">
              {isLoading ? (
                <ImageSkeleton
                  className="w-52 h-52 rounded-xl"
                  animated={false}
                />
              ) : (
                <Image
                  alt="Kuser Image"
                  src={
                    "https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg"
                  }
                  width={400}
                  height={400}
                  className="rounded-xl w-52 h-52"
                />
              )}
            </span>

            <div className="pt-24 flex flex-col justify-start space-y-4">
              <h2 className="font-bold text-2xl">
                {isLoading ? (
                  <span className="flex space-x-2">
                    <TextSkeleton
                      className="md:28 w-16 text-gray-200"
                      height={4}
                    />{" "}
                    <TextSkeleton
                      className="ms-2 md:32 w-16 text-gray-100"
                      height={4}
                    />
                  </span>
                ) : (
                  ucfirst(kuser.firstname) + " " + ucfirst(kuser.name)
                )}
              </h2>
            </div>

            <div>
              <span className="my-1 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded flex items-center bg-gray-50 border">
                <span className="px-1 text-white">
                  <MdOutlineConnectWithoutContact className="w-4 h-4 text-gray-700" />
                </span>
                {isLoading ? (
                  <TextSkeleton className="w-16" bgClass="bg-gray-300/25" />
                ) : (
                  <span className="text-sm text-gray-700 space-x-1">
                    <span id="konect-stat">{kuser.konect_count}</span>
                    <span>{esser("konect", kuser.konect_count)}</span>
                  </span>
                )}
              </span>
            </div>

            <div className="flex flex-wrap items-center mt-1">
              {isLoading ? (
                <span className="flex space-x-2">
                  <ImageSkeleton className="w-12 h-12" />
                  <ImageSkeleton className="w-12 h-12" />
                  <ImageSkeleton className="w-12 h-12" />
                </span>
              ) : (
                <SocialMediaBloc socialProfils={vinfo.socialProfils} />
              )}
            </div>

            <div className="bg-gray-50 border rounded-md w-full md:pb-0 pb-3">
              <ul className="py-2 divide-y divide-gray-200 px-3">
                <li className="flex space-x-3 items-center overflow-hidden py-3">
                  <span className="bg-white min-w-10 h-10 rounded flex justify-center items-center border">
                    <TbMail className="w-5 text-gray-500 hover:text-gray-800 cursor-pointer" />
                  </span>

                  <div className="inline-flex flex-col justify-center w-[inherit]">
                    <span className="font-bold text-sm text-gray-400">
                      {"Email"}
                    </span>
                    {isLoading ? (
                      <span>
                        <TextSkeleton
                          className="w-56 mt-1"
                          bgClass="bg-gray-300/20"
                        />
                      </span>
                    ) : (
                      <a
                        href="mailto:{{ $vcard->email->text }}"
                        className="hover:underline text-gray-700 break-words"
                      >
                        {vinfo.email.text}
                      </a>
                    )}
                  </div>
                </li>
                <li className="flex space-x-3 py-3 items-center overflow-hidden">
                  <span className="bg-white min-w-10 h-10 rounded flex justify-center items-center border">
                    <TbPhone className="w-5 text-gray-500 hover:text-gray-800 cursor-pointer" />
                  </span>
                  <div className="flex flex-col justify-center">
                    <span className="font-bold text-sm text-gray-400">
                      {"Phone"}
                    </span>
                    {isLoading ? (
                      <span>
                        <TextSkeleton
                          className="w-40 mt-1"
                          bgClass="bg-gray-300/20"
                        />
                      </span>
                    ) : (
                      <a
                        href="tel:{{ $vcard->phone->text }}"
                        className="hover:underline text-gray-700"
                      >
                        {vinfo.phone.text}
                      </a>
                    )}
                  </div>
                </li>
                <li className="flex space-x-3 items-center overflow-hidden py-3">
                  <span className="bg-white min-w-10 h-10 rounded flex justify-center items-center border">
                    <MdLocationPin className="w-5 text-gray-500 hover:text-gray-800 cursor-pointer" />
                  </span>

                  <div className="inline-flex flex-col justify-center w-[inherit]">
                    <span className="font-bold text-sm text-gray-400">
                      {"Location"}
                    </span>
                    {isLoading ? (
                      <span>
                        <TextSkeleton
                          className="w-52 mt-1"
                          bgClass="bg-gray-300/20"
                        />
                      </span>
                    ) : (
                      <a
                        href={
                          "https://www.google.com/maps/search/?api=1&query=" +
                          vinfo.location.city +
                          "+" +
                          vinfo.location.state +
                          "+" +
                          vinfo.location.iso_code
                        }
                        target="_blank"
                        className="hover:underline text-gray-700 break-words"
                      >
                        {vinfo.location.city +
                          ", " +
                          vinfo.location.state +
                          ", " +
                          vinfo.location.iso_code}
                      </a>
                    )}
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex space-x-3 md:pb-2 md:relative md:w-full md:shadow-none shadow py-4 fixed z-30 md:bg-white bg-black-light justify-center items-center bottom-0 left-0 w-screen">
              <Button theme={customButtonTheme} color="primary">
                <TbUsersPlus className={"w-8"}/>
                {('Save')}
              </Button>
              <Button theme={customButtonTheme}  color="gray">
                <TbShare3 className={"w-8"}/>
                {('Share')}
              </Button>
            </div>
          </div>
        </div>

        <div className="border my-2 bg-white lg:col-span-8 sm:col-span-6 col-span-12 flex flex-col space-y-8  px-8 rounded-lg">
          {isLoading ? (
            <span>
              <h3 className="text-gray-700 font-bold text-lg mb-4 mt-4">
                {"About me"}
              </h3>
              <span className="flex flex-col space-y-3 mt-4 mb-4">
                <span className="flex space-x-2">
                  <TextSkeleton className="ms-2 w-20 text-gray-200" />
                  <TextSkeleton className="ms-2 w-48 text-gray-300/25" />
                  <TextSkeleton className="ms-2 w-full text-gray-200" />
                </span>
                <span className="flex space-x-2">
                  <TextSkeleton className="ms-2 w-20 text-gray-200" />
                  <TextSkeleton className="ms-2 w-full text-gray-300/25" />

                  <TextSkeleton className="ms-2 w-36 text-gray-200" />
                </span>
              </span>
            </span>
          ) : (
            vinfo.note && (
              <div>
                <h3 className="text-gray-700 font-bold text-lg mb-4 mt-4">
                  {"About me"}
                </h3>
                <p className="mt-4 text-gray-500">{vinfo.note.text}</p>
              </div>
            )
          )}

          {isLoading ? (
            <span>
              <h3 className="text-gray-700 font-bold text-lg mb-6">
                {"Externals Links"}
              </h3>
              <ExternalLinkSkeleton />
            </span>
          ) : (
            vinfo.urls.length > 0 && (
              <div>
                <h3 className="text-gray-700 font-bold text-lg mb-6">
                  {"Externals Links"}
                </h3>
                <div className="grid gap-3 md:grid-cols-2 grid-cols-1">
                  {Object.keys(vinfo.urls).map((key, i) => (
                    <div
                      className="flex justify-start bg-slate-50 rounded-md border  items-center p-2 overflow-hidden"
                      key={i}
                    >
                      <span className="bg-white p-2 border rounded-md">
                        <TbExternalLink className="w-6" />
                      </span>
                      <div className="flex flex-col px-4">
                        <span className="text-sm font-bold">
                          {vinfo.urls[key].type}
                        </span>
                        <span>
                          <a
                            className="text-gray-500 underline truncate"
                            target="__blank"
                            href={vinfo.urls[key].uri}
                          >
                            {vinfo.urls[key].uri}
                          </a>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          {isLoading ? (
            <span>
              <h3 className="text-gray-700 font-bold text-lg mb-4 mt-4">
                {"Videos"}
              </h3>
              <VideoSkeleton
                className="w-full h-60 rounded-xl"
                animated={true}
              />
            </span>
          ) : (
            vinfo.urls.length > 0 && (
              <div className="pb-28">
                <h3 className="text-gray-700 font-bold text-lg mb-6">
                  {"Videos"}
                </h3>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                  {Object.keys(vinfo.videoLinks).map((key, i) => (
                    <div
                      className="flex flex-col items-center space-y-3"
                      key={i}
                    >
                      <iframe
                        src={vinfo.videoLinks[key].uri}
                        title="W3Schools Free Online Web Tutorials"
                        className="w-full h-52"
                        loading="lazy"
                      ></iframe>
                      <span className="text-gray-400 text-sm">
                        {vinfo.videoLinks[key].type}
                      </span>
                    </div>
                  ))}{" "}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function SocialMediaBloc({
  socialProfils,
}: {
  socialProfils: any;
}): React.ReactElement {
  return (
    <>
      {Object.keys(socialProfils).map((so: any, i) => (
        <span className="mr-3 mt-3" key={i}>
          {socialProfils[so].uri && socialProfils[so].type == "instagram" && (
            <Link
              href={socialProfils[so].uri}
              target="_blank"
              className="border h-12 w-12 rounded-md flex items-center justify-center"
            >
              <Image
                className="w-14 rounded"
                src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg"
                alt="instagram"
                loading="lazy"
                width={500}
                height={500}
              />
            </Link>
          )}

          {socialProfils[so].uri && socialProfils[so].type == "facebook" && (
            <Link
              href={socialProfils[so].uri}
              target="_blank"
              className="border h-12 w-12 rounded-md flex items-center justify-center"
            >
              <Image
                className="w-14 rounded"
                src="https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg"
                alt="facebook"
                loading="lazy"
                width={500}
                height={500}
              />
            </Link>
          )}

          {socialProfils[so].uri && socialProfils[so].type == "linkedin" && (
            <Link
              href={socialProfils[so].uri}
              target="_blank"
              className="border h-12 w-12 rounded-md flex items-center justify-center"
            >
              <Image
                className="w-7 rounded"
                src="https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg"
                alt="linkedin"
                loading="lazy"
                width={500}
                height={500}
              />
            </Link>
          )}

          {socialProfils[so].uri && socialProfils[so].type == "youtube" && (
            <Link
              href={socialProfils[so].uri}
              target="_blank"
              className="border h-12 w-12 rounded-md flex items-center justify-center"
            >
              <Image
                className="w-7 rounded"
                src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
                alt="youtube"
                loading="lazy"
                width={500}
                height={500}
              />
            </Link>
          )}

          {socialProfils[so].uri && socialProfils[so].type == "tiktok" && (
            <Link
              href={socialProfils[so].uri}
              target="_blank"
              className="border h-12 w-12 rounded-md flex items-center justify-center"
            >
              <Image
                className="w-12 rounded"
                src="https://www.logo.wine/a/logo/TikTok/TikTok-Icon-Logo.wine.svg"
                alt="tiktok"
                loading="lazy"
                width={500}
                height={500}
              />
            </Link>
          )}

          {socialProfils[so].uri && socialProfils[so].type == "twitter" && (
            <Link
              href={socialProfils[so].uri}
              target="_blank"
              className="border h-12 w-12 rounded-md flex items-center justify-center"
            >
              <Image
                className="w-6 rounded"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553"
                alt="twitter"
                loading="lazy"
                width={500}
                height={500}
              />
            </Link>
          )}
        </span>
      ))}
    </>
  );
}
