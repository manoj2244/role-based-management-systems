import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

export const useUsers = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data;
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (id: string) => api.delete(`/users/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const createUser = useMutation({
    mutationFn: async (user: any) => api.post("/users", user),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const updateUser = useMutation({

    
    
    mutationFn: async ({ id, user }: { id: string; user: any }) =>
      api.put(`/users/${id}`, {...user,id:id}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  return { users: data, isLoading, deleteUser, createUser, updateUser };
};
