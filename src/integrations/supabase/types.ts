export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          category: string | null
          description: string | null
          id: string
          order_index: number | null
          tier: string
          title: string
          xp_value: number
        }
        Insert: {
          category?: string | null
          description?: string | null
          id?: string
          order_index?: number | null
          tier: string
          title: string
          xp_value: number
        }
        Update: {
          category?: string | null
          description?: string | null
          id?: string
          order_index?: number | null
          tier?: string
          title?: string
          xp_value?: number
        }
        Relationships: []
      }
      country_research: {
        Row: {
          country_id: string
          fact_type: string
          id: string
          response: string
          saved_at: string
          student_id: string
          updated_at: string
        }
        Insert: {
          country_id: string
          fact_type: string
          id?: string
          response?: string
          saved_at?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          country_id?: string
          fact_type?: string
          id?: string
          response?: string
          saved_at?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      custom_tags: {
        Row: {
          color: string
          created_at: string
          created_by: string
          id: string
          is_global: boolean
          name: string
        }
        Insert: {
          color?: string
          created_at?: string
          created_by: string
          id?: string
          is_global?: boolean
          name: string
        }
        Update: {
          color?: string
          created_at?: string
          created_by?: string
          id?: string
          is_global?: boolean
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_tags_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      explorations: {
        Row: {
          checklist: Json
          completed_at: string | null
          country_id: string
          id: string
          progress_pct: number
          started_at: string | null
          status: string
          student_id: string
          tier: string | null
          total_xp_earned: number
        }
        Insert: {
          checklist?: Json
          completed_at?: string | null
          country_id: string
          id?: string
          progress_pct?: number
          started_at?: string | null
          status?: string
          student_id: string
          tier?: string | null
          total_xp_earned?: number
        }
        Update: {
          checklist?: Json
          completed_at?: string | null
          country_id?: string
          id?: string
          progress_pct?: number
          started_at?: string | null
          status?: string
          student_id?: string
          tier?: string | null
          total_xp_earned?: number
        }
        Relationships: [
          {
            foreignKeyName: "explorations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entries: {
        Row: {
          content: string
          country_id: string
          created_at: string
          id: string
          photo_url: string | null
          student_id: string
          tags: string[] | null
          title: string
          updated_at: string
          word_count: number
        }
        Insert: {
          content?: string
          country_id: string
          created_at?: string
          id?: string
          photo_url?: string | null
          student_id: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          word_count?: number
        }
        Update: {
          content?: string
          country_id?: string
          created_at?: string
          id?: string
          photo_url?: string | null
          student_id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          word_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_prompts: {
        Row: {
          id: string
          prompt_text: string
          tier: string
        }
        Insert: {
          id?: string
          prompt_text: string
          tier?: string
        }
        Update: {
          id?: string
          prompt_text?: string
          tier?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_color: string | null
          avatar_url: string | null
          class_code: string | null
          created_at: string
          grade: string | null
          has_seen_onboarding: boolean
          id: string
          name: string
          tier: string | null
          total_xp: number
          xp_points: number
        }
        Insert: {
          avatar_color?: string | null
          avatar_url?: string | null
          class_code?: string | null
          created_at?: string
          grade?: string | null
          has_seen_onboarding?: boolean
          id: string
          name?: string
          tier?: string | null
          total_xp?: number
          xp_points?: number
        }
        Update: {
          avatar_color?: string | null
          avatar_url?: string | null
          class_code?: string | null
          created_at?: string
          grade?: string | null
          has_seen_onboarding?: boolean
          id?: string
          name?: string
          tier?: string | null
          total_xp?: number
          xp_points?: number
        }
        Relationships: []
      }
      student_activities: {
        Row: {
          activity_id: string
          completed_at: string
          country_id: string
          id: string
          notes: string | null
          student_id: string
          xp_earned: number
        }
        Insert: {
          activity_id: string
          completed_at?: string
          country_id: string
          id?: string
          notes?: string | null
          student_id: string
          xp_earned: number
        }
        Update: {
          activity_id?: string
          completed_at?: string
          country_id?: string
          id?: string
          notes?: string | null
          student_id?: string
          xp_earned?: number
        }
        Relationships: [
          {
            foreignKeyName: "student_activities_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_activities_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_feedback: {
        Row: {
          comment: string
          created_at: string
          entry_id: string
          id: string
          rating: number | null
          student_id: string
          teacher_id: string
        }
        Insert: {
          comment?: string
          created_at?: string
          entry_id: string
          id?: string
          rating?: number | null
          student_id: string
          teacher_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          entry_id?: string
          id?: string
          rating?: number | null
          student_id?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_feedback_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_feedback_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_feedback_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_resources: {
        Row: {
          created_at: string
          description: string
          emoji: string
          id: string
          name: string
          resource_key: string
          teacher_id: string
          url: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          description?: string
          emoji?: string
          id?: string
          name: string
          resource_key: string
          teacher_id: string
          url?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          description?: string
          emoji?: string
          id?: string
          name?: string
          resource_key?: string
          teacher_id?: string
          url?: string
          visible?: boolean
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      xp_ledger: {
        Row: {
          activity_id: string | null
          country_id: string | null
          earned_at: string
          id: string
          reason: string | null
          student_id: string
          xp_amount: number
        }
        Insert: {
          activity_id?: string | null
          country_id?: string | null
          earned_at?: string
          id?: string
          reason?: string | null
          student_id: string
          xp_amount: number
        }
        Update: {
          activity_id?: string | null
          country_id?: string | null
          earned_at?: string
          id?: string
          reason?: string | null
          student_id?: string
          xp_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "xp_ledger_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "xp_ledger_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_class_code: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "student" | "teacher"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "teacher"],
    },
  },
} as const
