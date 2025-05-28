import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  CalendarIcon,
  ExternalLink,
  FileCheck,
  FileEdit,
  MapPin,
  Star,
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  location: z.string().min(3, {
    message: "Please enter a valid location.",
  }),
  coordinates: z.string().optional(),
  intensity: z.enum(["1", "2", "3", "4", "5"]),
  date: z.string(),
  time: z.string(),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export function DataSubmissionForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      coordinates: "",
      intensity: "3",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().split(" ")[0].slice(0, 5),
      description: "",
    },
  });

  function onSubmit(data: FormValues) {
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Your earthquake report has been submitted successfully!");
    }, 1500);
  }

  const handleReset = () => {
    form.reset();
    setSubmitted(false);
  };

  // For simulating getting user's location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      toast.promise(
        new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }),
        {
          loading: "Getting your location...",
          success: (position) => {
            const { latitude, longitude } = position.coords;
            form.setValue("coordinates", `${latitude}, ${longitude}`);
            return "Location retrieved successfully";
          },
          error: "Failed to get your location",
        },
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  return (
    <ScrollArea className="h-full w-full">
      <div className="max-w-xl mx-auto py-6 px-4 md:px-6 pb-20">
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2">
            <FileEdit className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Report an Earthquake</h1>
          </div>
          <p className="text-muted-foreground">
            Share your experience to help us gather more accurate data on
            earthquake impacts.
          </p>
          <a target="_blank" href="https://quake-watch-feed.lovable.app">
            <Button className="w-full bg-gradient-to-r from-amber-800 to-amber-500 mt-2">
              View latest reports on Communities
              <ExternalLink />
            </Button>
          </a>
        </div>

        {submitted ? (
          <Card className="border border-border/60 animate-scale-in">
            <CardHeader className="bg-success-light border-b border-border/60">
              <div className="flex items-center gap-2 text-success-DEFAULT">
                <FileCheck className="h-5 w-5" />
                <CardTitle>Report Submitted</CardTitle>
              </div>
              <CardDescription>
                Thank you for contributing to our earthquake data collection
                efforts.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground mb-4">
                Your report has been successfully submitted and will help us
                better understand earthquake impacts in your area.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-border/60 pt-4">
              <Button onClick={handleReset}>Submit Another Report</Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border border-border/60 animate-float-up">
            <CardHeader>
              <CardTitle>Earthquake Experience Form</CardTitle>
              <CardDescription>
                Please provide details about the earthquake you experienced
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              className="form-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input
                                placeholder="City, District"
                                {...field}
                                className="form-input"
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={handleGetLocation}
                            >
                              <MapPin className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="coordinates"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Coordinates (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Latitude, Longitude"
                              {...field}
                              className="form-input"
                              readOnly
                            />
                          </FormControl>
                          <FormDescription>
                            Use the location button above to set this
                            automatically
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type="date"
                                  {...field}
                                  className="form-input"
                                />
                              </FormControl>
                              <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                              <Input
                                type="time"
                                {...field}
                                className="form-input"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="intensity"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Felt Intensity</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex justify-between space-y-1"
                            >
                              {[1, 2, 3, 4, 5].map((value) => (
                                <FormItem
                                  key={value}
                                  className="flex items-center space-x-0 space-y-0 flex-col"
                                >
                                  <FormControl>
                                    <RadioGroupItem
                                      value={value.toString()}
                                      id={`intensity-${value}`}
                                      className="sr-only"
                                    />
                                  </FormControl>
                                  <FormLabel
                                    htmlFor={`intensity-${value}`}
                                    className={`flex flex-col items-center justify-center size-12 rounded-full cursor-pointer transition-all ${field.value === value.toString() ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                                  >
                                    <span>{value}</span>
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormDescription className="text-center">
                            1 (Barely felt) to 5 (Very strong)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe what you felt or observed"
                              className="resize-none min-h-[100px] form-input"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide details about what you experienced during
                            the earthquake
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
}
