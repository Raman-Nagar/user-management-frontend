import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "../lib/queryClient";
import { isUnauthorizedError } from "../lib/authUtils";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { profileSchema, type ProfileType } from "../shemas/profile-schemas";
import type { UserType } from "../types";
import { logout } from "../hooks/useAuth";

interface UpdateUserModalProps {
  open: boolean;
  onClose: () => void;
  user: UserType;
}

export function UpdateUserModal({ open, onClose, user }: UpdateUserModalProps) {
  const queryClient = useQueryClient();
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const form = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
    },
  });

  // Set form values when user data is loaded
  useEffect(() => {
    if (user && open) {
      setPreviewUrl(user.avatar || "");
    }
  }, [user, form, open]);

  const updateUpdateUserMutation = useMutation({
    mutationFn: async (data: ProfileType) => {
      return await apiRequest("PUT", `/user/${user.id}`, data);
    },
    onSuccess: () => {
      toast.success("Success: UpdateUser updated successfully");
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users/stats"] });
      onClose();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast.error("Unauthorized: You are logged out. Logging in again...");
        setTimeout(() => {
          logout();
        }, 500);
        return;
      }
      toast.error("Error: Failed to update updateUser");
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!user) throw new Error("User not found");
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await apiRequest(
        "PUT",
        `/user/${user.id}`,
        null,
        formData
      );

      return response;
    },
    onSuccess: (data: any) => {
      toast.success("Success: UpdateUser image updated successfully");
      setPreviewUrl(data?.avatar);
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users/stats"] });
    },
    onError: () => {
      toast.error("Error: Failed to upload image");
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      await uploadImageMutation.mutateAsync(file);
    }
  };

  const onSubmit = async (data: ProfileType) => {
    await updateUpdateUserMutation.mutateAsync(data);
  };

  const handleClose = () => {
    form.reset();
    setPreviewUrl("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit UpdateUser</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* UpdateUser Image Upload */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={previewUrl} alt="UpdateUser" />
                <AvatarFallback>
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="updateUser-image"
                className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-primary/90 transition-colors"
              >
                {uploadImageMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
              </label>
              <input
                id="updateUser-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={uploadImageMutation.isPending}
              />
            </div>
            <p className="text-sm text-slate-500 mt-2">
              Click the camera icon to change your updateUser picture
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="John"
                {...form.register("firstName")}
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...form.register("lastName")}
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              placeholder="john@gmail.com"
              type="email"
              readOnly
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" {...form.register("phone")} />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={3}
              placeholder="Tell us about this user..."
              {...form.register("bio")}
            />
            {form.formState.errors.bio && (
              <p className="text-sm text-red-500">
                {form.formState.errors.bio.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateUpdateUserMutation.isPending}>
              {updateUpdateUserMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
