'use server';

import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { db } from '@/db';
import { profiles, type InsertProfile } from '@/db/schema';

export const completeOnboarding = async (formData: FormData) => {
  const user = await currentUser();

  if (!user) {
    return { message: 'No Logged In User' };
  }

  const { id, username } = user;

  const client = await clerkClient();

  try {
    const jobTitle = formData.get('jobTitle') as string;
    const res = await client.users.updateUser(id, {
      publicMetadata: {
        onboardingComplete: true,
        jobTitle,
      },
    });

    const newProfile: InsertProfile = {
      userId: id,
      name: String(username),
      jobTitle,
    };

    await db.insert(profiles).values(newProfile);
    return { message: res.publicMetadata };
  } catch (err) {
    console.log(err);
    return { error: 'There was an error updating the user metadata.' };
  }
};
