import Image from "next/image";
import Button from "./_components/Common/Buttons/Button";
import Header from "./_components/Common/Headers/Header";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Button onClick={()=>{ console.log("OK");}} outlined={true} >
        Bonjour
      </Button>
    </main>
  );
}
