import { useParams } from "react-router-dom";
import { ItemService } from "../services/itemService";
import { useEffect, useState } from "react";
import { isPathName } from "../utils/usePath";
import { Item } from "../models/itemModels";
import { CONNECTION } from "../config/config";

export const useItem = () => {
  const { itemId, projectKey, productId } = useParams();
  const itemService = new ItemService();
  const [items, setItems] = useState<Item[]>([]);
  const [item, setItem] = useState<Item | null>(null);
  const [versions, setVersions] = useState<Item[]>([]);
  const [version, setVersion] = useState<Item | null>(null);
  const [stores, setStores] = useState<Item[]>([]);
  const [product, setProduct] = useState<Item | null>(null);

  useEffect(() => {
    isPathName(
      [`/product/${itemId}`, `/${projectKey}/event/${itemId}/import`],
      () => {
        fetchItem(
          itemId!,
          setItem as React.Dispatch<React.SetStateAction<Item>>
        );
      }
    );

    isPathName([`/${projectKey}/event/${itemId}`], () => {
      searchItemsbyProject(CONNECTION.APP!);
    });

    isPathName([`/${projectKey}/event`, `/${projectKey}/event/version`], () => {
      searchVersions(CONNECTION.VERSION!);
    });
    isPathName([`/home`, `/basket`], () => {
      searchStores(CONNECTION.STORES!);
    });

    // isPathName([`/register`], () => {
    //   searchStores(CONNECTION.USERS!);
    // });

    isPathName([`/product/${productId}`], () => {
      fetchItem(
        productId!,
        setProduct as React.Dispatch<React.SetStateAction<Item>>
      );
    });
  }, [itemId, projectKey]);

  const searchItemsbyProject = async (projectId: string) => {
    try {
      const query = {
        projectId: projectId,
      };

      const params = {
        query,
        select: ["number", "fields", "board", "_id", "coverPhoto"],
        populate: ["fields.common.fieldId", "fields.custom.fieldId"],
        sort: "-createdAt",
        limit: 10,
        lean: true,
      };

      searchItemsByQuery(params);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const searchVersions = async (projectId: string) => {
    try {
      const query = {
        projectId: projectId,
      };

      const params = {
        query,
        select: ["number", "fields", "board", "_id", "coverPhoto"],
        populate: ["fields.common.fieldId", "fields.custom.fieldId"],
        sort: "-createdAt",
        limit: 10,
        lean: true,
      };

      const result = await searchItems(params);

      setVersions(result);

      setVersion(result[0]);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const searchStores = async (projectId: string) => {
    try {
      const query = {
        projectId: projectId,
      };

      const params = {
        query,
        select: ["number", "fields", "board", "_id", "coverPhoto"],
        populate: ["fields.common.fieldId", "fields.custom.fieldId"],
        sort: "-createdAt",
        limit: 10,
        lean: true,
      };

      const result = await searchItems(params);

      setStores(result);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const searchItemsByQuery = async (params: any) => {
    try {
      const result = await searchItems(params);
      setItems(result);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchItem = async (
    id: string,
    setItem?: React.Dispatch<React.SetStateAction<Item>>
  ) => {
    try {
      const params = {
        select: ["fields", "_id", "coverPhoto"],
        populate: [
          { path: "fields.custom.fieldId" },
          { path: "fields.common.fieldId" },
        ],
        lean: true,
      };
      const result = await getItem(id, params);

      setItem && setItem(result);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const fetchItemsByProject = async (projectId: string) => {
    try {
      const result = await getItemByProjectId(projectId);
      setItems(result);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const getCustomFieldValue = (fieldName: string, item?: Item) => {
    const field = item?.fields?.custom?.find(
      (field) => field.fieldId.name === fieldName
    );
    if (field) return field.value;

    return null;
  };

  // MAIN FUNCTION
  const getItem = async (id: string, params?: any) => {
    try {
      const Item = await itemService
        .select(params?.select as string[])
        .populate(params?.populate)
        .sort(params?.sort)
        .lean(params?.lean)
        .get(id);
      return Item;
    } catch (error) {
      console.log(error);
    }
  };

  const getItemByProjectId = async (projectId: string) => {
    try {
      const Item = await itemService.getAllByProject(projectId);
      return Item;
    } catch (error) {
      console.log(error);
    }
  };

  const getItems = async () => {
    try {
      const Items = await itemService.getAll();
      return Items;
    } catch (error) {
      console.log(error);
    }
  };

  const createItem = async (data: Item) => {
    try {
      const Item = await itemService.create(data);
      return Item;
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async (data: Item) => {
    try {
      const item = await itemService.update(data);
      return item;
    } catch (error) {
      console.log(error);
    }
  };

  const searchItems = async (params: any) => {
    try {
      const Items = await itemService.search(params);
      return Items;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const Item = await itemService.delete(id);
      return Item;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    itemId,
    getItem,
    getItemByProjectId,
    getItems,
    searchItems,
    createItem,
    updateItem,
    removeItem,
    //other
    items,
    item,
    versions,
    version,
    stores,
    product,
    setItem,
    setItems,
    searchItemsByQuery,
    fetchItem,
    fetchItemsByProject,
    searchItemsbyProject,
    getCustomFieldValue,
  };
};
