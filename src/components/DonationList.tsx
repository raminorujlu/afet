import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceItem {
  title: string;
  logo: string;
  link: string;
}

interface ResourceSectionProps {
  title: string;
  items: ResourceItem[];
}

function ResourceSection({ title, items }: ResourceSectionProps) {
  return (
    <div className="mb-8 animate-float-up">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <Card
            key={index}
            className="aspect-video border border-border/60 transition-all hover:shadow-subtle p-2 flex flex-col justify-center"
          >
            <CardContent className="p-2">
              <div className="flex items-center justify-between flex-col w-full">
                <img width={36} height={36} src={item.logo} alt={item.title} />
                <CardTitle className="text-lg text-center">
                  {item.title}
                </CardTitle>
              </div>
            </CardContent>
            <CardFooter className="p-0 ">
              <a className="mx-auto" href={item.link} target="_blank">
                <Button>Learn more</Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function DonationList() {
  const donateItems: ResourceItem[] = [
    {
      title: "AFAD | Bağış Hesapları",
      logo: "https://www.afad.gov.tr/kurumlar/afad.gov.tr/Kurumsal-Kimlik/Logolar/PNG/AFAD-Logo-Renkli.png",
      link: "https://www.afad.gov.tr/depremkampanyasi2",
    },
    {
      title: "Kızılay | Acil Durum Bağışı",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcQWv-HKGXoTsUt5wQf39xrQWdFOofACcC_A&s",
      link: "https://bagis.kizilay.org.tr/tr/bagis/bagisyap/215/afet-acil-durum-bagisi?bagismiktar=",
    },
    {
      title: "TEGV | Deprem Sonrası Destek",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Oe5TduDK34yRd4u6-s8lmc9CCHTnq_td4A&s",
      link: "https://tegv.org/deprem-sonrasi-calismalarimiz",
    },
    {
      title: "Darüşşafaka | Eğitimde Fırsat Eşitliliği",
      logo: "https://yt3.googleusercontent.com/D2T9NhX1Xd9gjVIdHCLJPLO2mbzv-pLuUyWSfLyzfHzbC5gyWaCwuvBYTPND2VAZZKmQk1Ql=s900-c-k-c0x00ffffff-no-rj",
      link: "https://www.darussafaka.org/bagis/egitim-bizden-yuva-sizden-bagis-kampanyasi",
    },
    {
      title: "İHH | Türkiye Acil Yardım",
      logo: "https://ihh.org.tr/images/press/Horizontal_tr.svg",
      link: "https://ihh.org.tr/bagis",
    },
  ];

  const infoItems: ResourceItem[] = [
    {
      title: "AFAD | T.C. İçişleri Bakanlığı",
      logo: "https://www.afad.gov.tr/kurumlar/afad.gov.tr/Kurumsal-Kimlik/Logolar/PNG/AFAD-Logo-Renkli.png",
      link: "https://deprem.afad.gov.tr/home-page",
    },
    {
      title: "AHBAP | Ahbap Derneği",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc9ekNITFUkxs7fSRrytEbJLb-K0OatHHkXg&s",
      link: "https://ahbap.org/",
    },
    {
      title: "Enkaz Radarı | Türkiye Barolar Birliği",
      logo: "https://play-lh.googleusercontent.com/rO8OFcMHI1jGt3VmCcClDOfC48YChq8-DonzyCAYcietyPOJdZrk7eZvrJAIVwZ-bBM",
      link: "https://www.tbbenkazradari.com.tr/",
    },

    {
      title: "Kandilli Rasathanesi | Boğaziçi Üniversitesi",
      logo: "https://upload.wikimedia.org/wikipedia/tr/0/0f/Kandilli_Rasathanesi_ve_Deprem_Ara%C5%9Ft%C4%B1rma_Enstit%C3%BCs%C3%BC_logosu.jpg",
      link: "http://www.koeri.boun.edu.tr/new/",
    },

    {
      title: "AKUT | Arama Kurtarma Derneği",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Akut_logo.jpg",
      link: "https://www.akut.org.tr/",
    },

    {
      title: "UNICEF | Her Çoçuk İçin",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/UNICEF_Logo_%28cropped%29.png",
      link: "https://www.unicef.org/turkiye/",
    },
  ];

  return (
    <ScrollArea className="h-full w-full py-6 px-4 md:px-6">
      <div className="max-w-4xl mx-auto pb-20">
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Donation List</h1>
          </div>
          <p className="text-muted-foreground">
            A curated collection of donation links to support various causes and
            make a positive impact.
          </p>
        </div>
        <ResourceSection title="Donation List" items={donateItems} />

        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Information List</h1>
          </div>
          <p className="text-muted-foreground">
            A curated collection of valuable information links for quick and
            easy reference.
          </p>
        </div>
        <ResourceSection title="Information List" items={infoItems} />
      </div>
    </ScrollArea>
  );
}
