import Image from "next/image";
import Button from "./_components/Common/Buttons/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={()=>{ console.log("OK");}} outlined={true} >
        Bonjour
      </Button>
    </main>
  );
}
