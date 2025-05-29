import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Shield,
  Home,
  Package,
  Phone,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResourceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
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
            className="border border-border/60 transition-all hover:shadow-subtle"
          >
            <CardHeader className={cn("pb-2", item.colorClass)}>
              <div className="flex items-center gap-2">
                {item.icon}
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <CardDescription className="text-foreground/80 text-sm">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function PreparednessResources() {
  const beforeItems: ResourceItem[] = [
    {
      icon: <Home className="h-5 w-5 text-primary" />,
      title: "Secure Your Space",
      description:
        "Identify potential hazards in your home. Secure heavy furniture to walls and move heavy objects to lower shelves.",
      colorClass: "border-b border-primary/20",
    },
    {
      icon: <Package className="h-5 w-5 text-primary" />,
      title: "Create Emergency Kit",
      description:
        "Prepare a kit with water, non-perishable food, flashlight, batteries, first aid supplies, and essential medications.",
      colorClass: "border-b border-primary/20",
    },
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "Family Plan",
      description:
        "Establish a family emergency plan including meeting points, contact numbers, and evacuation routes.",
      colorClass: "border-b border-primary/20",
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-warning-DEFAULT" />,
      title: "Know the Risks",
      description:
        "Learn about earthquake risks in your area and understand the warning signs of potential seismic activity.",
      colorClass: "border-b border-warning-DEFAULT/20",
    },
    {
      icon: <Lightbulb className="h-5 w-5 text-warning-DEFAULT" />,
      title: "Stay Informed",
      description:
        "Keep updated on local emergency procedures and download alert apps for real-time notifications.",
      colorClass: "border-b border-warning-DEFAULT/20",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-success-DEFAULT" />,
      title: "Practice Drills",
      description:
        "Regularly practice 'Drop, Cover, and Hold On' drills with your family to ensure everyone knows what to do.",
      colorClass: "border-b border-success-DEFAULT/20",
    },
  ];

  const duringItems: ResourceItem[] = [
    {
      icon: <AlertTriangle className="h-5 w-5 text-danger-DEFAULT" />,
      title: "Drop, Cover, Hold On",
      description:
        "Drop to the ground, take cover under a sturdy desk or table, and hold on until the shaking stops.",
      colorClass: "border-b border-danger-DEFAULT/20",
    },
    {
      icon: <Home className="h-5 w-5 text-danger-DEFAULT" />,
      title: "Indoor Safety",
      description:
        "If indoors, stay there. Don't run outside or to other rooms during shaking. Move away from windows and exterior walls.",
      colorClass: "border-b border-danger-DEFAULT/20",
    },
    {
      icon: <Clock className="h-5 w-5 text-danger-DEFAULT" />,
      title: "Wait It Out",
      description:
        "Remain in place until the shaking stops. Be prepared for aftershocks which can occur minutes, days, or weeks later.",
      colorClass: "border-b border-danger-DEFAULT/20",
    },
  ];

  const afterItems: ResourceItem[] = [
    {
      icon: <CheckCircle className="h-5 w-5 text-success-DEFAULT" />,
      title: "Check for Injuries",
      description:
        "Check yourself for injuries before helping others. Provide first aid for minor injuries.",
      colorClass: "border-b border-success-DEFAULT/20",
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-warning-DEFAULT" />,
      title: "Inspect Your Surroundings",
      description:
        "Look for hazards such as gas leaks, water or electrical line damage, or structural damage. Leave if unsafe.",
      colorClass: "border-b border-warning-DEFAULT/20",
    },
    {
      icon: <Phone className="h-5 w-5 text-primary" />,
      title: "Communication",
      description:
        "Use text messages or social media to communicate with family. Avoid making unnecessary calls to keep lines open.",
      colorClass: "border-b border-primary/20",
    },
  ];

  const emergencyContacts = [
    {
      title: "Emergency Services",
      number: "112",
      description: "For immediate life-threatening emergencies",
    },
    {
      title: "AFAD (Disaster Management)",
      number: "122",
      description: "Türkiye's Disaster and Emergency Management Authority",
    },
    {
      title: "AKUT (Search & Rescue)",
      number: "0212 217 0410",
      description: "Search and Rescue Association",
    },
  ];

  return (
    <ScrollArea className="h-full w-full py-6 px-4 md:px-6">
      <div className="max-w-4xl mx-auto pb-20">
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">
              Earthquake Preparedness Guide
            </h1>
          </div>
          <p className="text-muted-foreground">
            Comprehensive information to help you prepare for, respond during,
            and recover after an earthquake.
          </p>
        </div>

        <ResourceSection title="Before an Earthquake" items={beforeItems} />
        <ResourceSection title="During an Earthquake" items={duringItems} />
        <ResourceSection title="After an Earthquake" items={afterItems} />

        <div className="mb-8 animate-float-up">
          <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
          <Card className="border border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Important Emergency Numbers
              </CardTitle>
              <CardDescription>
                Keep these numbers accessible at all times
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <h4 className="font-medium">{contact.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {contact.description}
                      </p>
                    </div>
                    <div className="font-bold text-primary">
                      {contact.number}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
