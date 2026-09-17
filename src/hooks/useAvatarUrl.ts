import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Given an avatar_url from a profile (which may be a full public URL or a storage path),
 * generates a short-lived signed URL for display.
 */
export function useAvatarUrl(avatarUrl: string | null | undefined): string | null {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!avatarUrl) {
      setSignedUrl(null);
      return;
    }

    // Extract the storage path from the avatar_url
    // It could be a full URL like .../storage/v1/object/public/avatars/userId/avatar.jpg?t=...
    // or just a path like userId/avatar.jpg
    let path = avatarUrl;
    const marker = "/object/public/avatars/";
    const markerAuth = "/object/sign/avatars/";
    if (path.includes(marker)) {
      path = path.split(marker)[1];
    } else if (path.includes(markerAuth)) {
      path = path.split(markerAuth)[1];
    }
    // Remove query params
    path = path.split("?")[0];

    if (!path) {
      setSignedUrl(null);
      return;
    }

    supabase.storage
      .from("avatars")
      .createSignedUrl(path, 3600) // 1 hour
      .then(({ data, error }) => {
        if (error || !data?.signedUrl) {
          setSignedUrl(null);
        } else {
          setSignedUrl(data.signedUrl);
        }
      });
  }, [avatarUrl]);

  return signedUrl;
}
